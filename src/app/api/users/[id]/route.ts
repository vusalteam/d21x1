import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/services/user";
import { prisma } from "../../db";
import { NextApiRequest } from "next";
import { MatchResult } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) return new NextResponse("Not authenticated", { status: 401 });
  const  id  = Number(params.id);
  if (!id)  return new NextResponse("Id must be number", { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      sentMatches: true,
      receivedMatches: true,
      followers: true,
      _count: {
        select: {
          followings: true,
          followers: true,
        },
      },
    },
  });
  if (!user) return new NextResponse("User not found", { status: 404 });
  const isFollowing = user.followers.some(
    (follower) => follower.id === +session.user.id
  );

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
  return NextResponse.json({
    id: user.id,
    username: user.username,
    steamId: user.steamId,
    status: user.status,
    avatar: user.avatar,
    wins: sentMatchesW + receivedMatchesW,
    losses: sentMatchesL + receivedMatchesL,
    followersCount: user._count.followers,
    followingsCount: user._count.followings,
    isFollowing,
  });
}
