import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/services/user";
import { prisma } from "../../db";
import { NextApiRequest } from "next";
import { MatchResult } from "@prisma/client";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session)
    return new NextResponse(
      JSON.stringify({ statusCode: 401, error: "Not logged in" }),
      { status: 401 }
    );
  const id = Number(session.user.id);
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      avatar: true,
      steamId: true,
      statusMessage: true,
      accountType: true,
      balance: true,
      roles: { select: { role: true } },
      sentMatches: true,
      receivedMatches: true,
      followers: {select:{id:true, username:true, avatar:true,status:true}},
      followings: {select:{id:true, username:true, avatar:true,status:true}}
    },
  });
  const mathces = await prisma.match.findMany({
    where: {
      OR: [{senderId: id},{recipientId: id}]},
    orderBy: {updatedAt: 'desc'},
    select:{
      id: true,
      bet: true,
      winnerId: true,
      updatedAt: true,
      result: true,
      sender:{select:{id:true, username:true, avatar:true,status:true}},
      recipientId: true,
    }
  });

  if (!user) return new NextResponse("User not found", { status: 404 });
  const roles = user.roles.map((r) => r.role);
  const sentMatchesW = user.sentMatches.filter(
    (match) =>
      match.result === MatchResult.FINISHED && match.winnerId === user.id
  ).length;
  const receivedMatchesW = user.receivedMatches.filter(
    (match) =>
      match.result === MatchResult.FINISHED && match.winnerId === user.id
  ).length;
  const sentMatchesL = user.sentMatches.filter(
    (match) =>
      match.result === MatchResult.FINISHED && match.winnerId !== user.id
  ).length;
  const receivedMatchesL = user.receivedMatches.filter(
    (match) =>
      match.result === MatchResult.FINISHED && match.winnerId !== user.id
  ).length;
  const lossesCount = sentMatchesL + receivedMatchesL;
  const winsCount = sentMatchesW + receivedMatchesW;
  return NextResponse.json({
    id,
    username: user.username,
    avatar: user.avatar,
    steamId: user.steamId,
    statusMessage: user.statusMessage,
    accountType: user.accountType,
    roles,
    balance: user.balance,
    winsCount,
    lossesCount,
    gamesCount: winsCount + lossesCount,
    followers: user.followers,
    followings: user.followings,
    mathces
  });
}
