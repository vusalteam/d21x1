import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/db";
import { getSession } from "@/services/user";
import { MatchResult, MatchStatus } from "@prisma/client";

export async function POST(request: NextRequest,{params}:{params:{id:string}}) {
  const session = await getSession();
  if (!session) {
    return new NextResponse(JSON.stringify("Not authenticated"), { status: 401 });
  }
  const id = Number(params.id);
  if (!id) return new NextResponse(JSON.stringify("Id must be number"), { status: 404 });
  const match = await prisma.match.findUnique({
    where: {id},
    include: { recipient:true},
  });
  if (!match) {
    return new NextResponse(JSON.stringify("Match not found"), { status: 404 });
  }
  if (match.recipientId !== session.user.id) {
    return new NextResponse(JSON.stringify("You are not the recipient"), { status: 403 });
  }
  if (match.status !== MatchStatus.PENDING || (match.result !== MatchResult.DRAW && match.result !== MatchResult.PENDING)) {
    return new NextResponse(JSON.stringify("Match can't accept"), { status: 400 });
  }
  await prisma.match.update({
    where: {id},
    data: {status:MatchStatus.DECLINED,result:MatchResult.CANCELED},
  });
  return new NextResponse(JSON.stringify({status:200, message:"Match success accepted"}), { status: 200 });
}
