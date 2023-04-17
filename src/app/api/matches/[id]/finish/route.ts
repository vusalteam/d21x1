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
  });
  if (!match) {
    return new NextResponse(JSON.stringify("Match not found"), { status: 404 });
  }
  if (match.recipientId !== session.user.id || match.senderId !== session.user.id) {
    return new NextResponse(JSON.stringify("Its not your match"), { status: 403 });
  }
  if (match.status !== MatchStatus.ACCEPTED) {
    return new NextResponse(JSON.stringify("Match can't finished"), { status: 400 });
  }
  await prisma.match.update({
    where: {id},
    data: {status:MatchStatus.FINISHED,result:MatchResult.FINISHED},
  });
  return new NextResponse(JSON.stringify({status:200, message:"Match success finiished"}), { status: 200 });
}
