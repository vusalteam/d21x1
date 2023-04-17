import { createChat, getChats } from "@/services/message";
import { getSession } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session)
    return new NextResponse(
      JSON.stringify({ status: 401, error: "Not authenticated" }),
      { status: 401 }
    );
  const chats = await getChats(session.user.id);
  return NextResponse.json(chats);
}
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session)
    return new NextResponse(
      JSON.stringify({ status: 401, error: "Not authenticated" }),
      { status: 401 }
    );
  const credentials: { ownerId: number; partnerId: number } =
    await request.json();
  if (!credentials.ownerId)
    return new NextResponse(
      JSON.stringify({ statusCode: 400, error: "Owner Id not provided" }),
      { status: 400 }
    );
  if (!credentials.partnerId)
    return new NextResponse(
      JSON.stringify({ statusCode: 400, error: "Partner Id not provided" }),
      { status: 400 }
    );
  const chat = await createChat(credentials.ownerId, credentials.partnerId);

  if (chat) return NextResponse.json({statusCode:201, message: 'success'});
  return new NextResponse(
    JSON.stringify({ statusCode: 500, error: "Chat not created" }),
    { status: 500 }
  );
}
