import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/db";
import { getSession } from "@/services/user";
import { MatchResult } from "@prisma/client";

export async function GET(request: NextRequest,{params}:{params:{id:string}}) {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Not authenticated", { status: 401 });
  }
  const id = Number(params.id);
  if (!id) return new NextResponse("Id must be number", { status: 404 });
  const match = await prisma.match.findUnique({
    where: {id},
    select: { id: true, sender:{ select:{id:true,avatar:true,username:true,status:true}} },
  });
  if (!match) {
    return new NextResponse("Match not found", { status: 404 });
  }
  return NextResponse.json(match);
}
