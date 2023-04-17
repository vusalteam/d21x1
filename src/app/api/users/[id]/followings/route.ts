import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/services/user";
import { NextApiRequest } from "next";
import { MatchResult } from "@prisma/client";
import { prisma } from "@/app/api/db";

export async function GET(request: Request,{params}: {params: {id: string}}) {
  const session = await getSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        status: "Unauthorized",
        message: "You are not logged in",
      }),
      { status: 401 }
    );
  }
  const followings = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
    select:{
      followings:{
        select:{
          id:true,
          status:true,
          steamId:true,
          statusMessage:true
        }
      }
    }
  }).followings();
  if (!followings) throw new Error("No followers found");
  return NextResponse.json(followings);
}
