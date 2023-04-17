import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../db";
import { getSession } from "@/services/user";
import { MatchResult } from "@prisma/client";
import { IFilter } from "@/app/users/components/UsersCard";

export async function GET(request: NextRequest,res: NextResponse) {
  const session = await getSession();

  if (!session) {
    return new NextResponse("Not authenticated", { status: 401 });
  }
  let users = [];
  let where = {};
  const query = request.nextUrl.searchParams.get("query");
  const filter = request.nextUrl.searchParams.get("filter") as IFilter;
  switch (filter) {
    case "following":
      where = {
        followers: {
          some: {
            id: session.user.id,
          },
        },
      };
      break;
    case "followers":
      where = {
        followings: {
          some: {
            id: session.user.id,
          },
        },
      };
      break;
    default:
     where = { id: { not: +session?.user.id } }
      break;
  }
  if (query) where = {...where, username: { contains: query }};
  users = await prisma.user.findMany({
    where,
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
  if (!users.length) {
    return new NextResponse("Users not found", { status: 404 });
  }
  const returnedUsers = users.map((user) => {
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
    
    return {
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
    }
  });
  return NextResponse.json(returnedUsers);
}
