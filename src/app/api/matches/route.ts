import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/db";
import { getAllMatchesByUserId, getRecipientMatchesByUserIdAndResultAndStatus, getSentMatchesByUserId } from "@/services/matches";
import { getSession } from "@/services/user";
import { MatchResult, MatchStatus } from "@prisma/client";
import { NextURL } from "next/dist/server/web/next-url";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return new NextResponse(JSON.stringify({status: 401, error:"Not authenticated"}), { status: 401 });

  const query = new URLSearchParams(request.url);
  let matches = []
  switch (query.get("result")) {
      case "requests":
        matches = await getRecipientMatchesByUserIdAndResultAndStatus(session.user.id, MatchResult.DRAW, MatchStatus.PENDING);
        break;
      case "sent":
        matches = await getSentMatchesByUserId(session.user.id);
        break;
      default:
        matches = await getAllMatchesByUserId(session.user.id);
  }
  
  if (!matches.length) {
    return new NextResponse(JSON.stringify({status: 404, error:"Matches not found"}), { status: 404 });
  }
  return NextResponse.json(matches);
}


export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return new NextResponse(JSON.stringify({status: 401, error:"Not authenticated"}), { status: 401 });
  const url = new NextURL(request.url).searchParams;

  const bet = Number(url.get("bet"));
  if (bet < 1 || bet > 100000) return new NextResponse(JSON.stringify({status: 400, error:"Bet must be between 1 and 100 000"}), { status: 400 });
  const recipientId = Number(url.get("recipientId"));
  if (recipientId < 1) return new NextResponse(JSON.stringify({status: 400, error:"Recipient id must be greater than 0"}), { status: 400 });
  const recipient = await prisma.user.findUnique({where: { id: recipientId }});
  if (!recipient) return new NextResponse(JSON.stringify({status: 404, error:"Recipient not found"}), { status: 404 });
  const match = await prisma.match.create({
    data: {
      senderId: session.user.id,
      recipientId: recipient.id,
      bet,
    },
  });
  if (!match) return new NextResponse(JSON.stringify({status: 500, error:"Error while creating match"}), { status: 500 });
  
  return new NextResponse(JSON.stringify({status: 201, message:"Success"}), { status: 201 });
}



