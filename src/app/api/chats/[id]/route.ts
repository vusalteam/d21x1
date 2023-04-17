import { createMessage } from "@/services/message";
import { createChat, getChatById, getChats } from "@/services/message";
import { pusherServer } from "@/services/pusher";
import { getSession } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}: {params: {id: number}}) {
  const session = await getSession();
  if (!session)
    return new NextResponse(
      JSON.stringify({ status: 401, error: "Not authenticated" }),
      { status: 401 }
    );
  const id = params.id;
  if (!id)
    return new NextResponse(
      JSON.stringify({ statusCode: 400, error: "Id not provided" }),
      { status: 400 }
    );
  const chat = await getChatById(Number(id));
  if (!chat)
    return new NextResponse(
      JSON.stringify({ statusCode: 404, error: "Chat not found" }),
      { status: 404 }
    );
  return NextResponse.json(chat);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session)
    return new NextResponse(
      JSON.stringify({ status: 401, error: "Not authenticated" }),
      { status: 401 }
    );
  const body = await request.json();
  const {chatId, message} = body;
  if (!chatId )
    return new NextResponse(
      JSON.stringify({ statusCode: 400, error: "Chat Id  not provided" }),
      { status: 400 }
    );
    const reqChat = await getChatById(Number(chatId));
    if (!reqChat)
      return new NextResponse(
        JSON.stringify({ statusCode: 404, error: "Chat not found" }),
        { status: 404 }
      );
    const isMember = reqChat.members.some((member) => member.id === session.user.id);
    if (!isMember)
      return new NextResponse(
        JSON.stringify({ statusCode: 403, error: "You are not a member of this chat" }),
        { status: 403 }
      );
  if (!message || message.length < 1) 
    return new NextResponse(
      JSON.stringify({ statusCode: 400, error: "Message not provided" }),
      { status: 400 }
    );
  const chatMessage = await createMessage(session.user.id,Number(chatId), message);
  if (!chatMessage)
    return new NextResponse(
      JSON.stringify({ statusCode: 500, error: "Error creating message" }),
      { status: 500 }
    );
    pusherServer.trigger(`chat_${reqChat.id}_incoming-message`, 'chat_incoming-message',
      chatMessage
    );
    return new NextResponse(
      JSON.stringify(chatMessage),
      { status: 201 }
    );
}

