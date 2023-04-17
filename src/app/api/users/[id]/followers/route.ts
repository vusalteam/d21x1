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
  const followers = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
    select:{
      followers:{
        select:{
          id:true,
          status:true,
          steamId:true,
          statusMessage:true
        }
      }
    }
  }).followers();
  if (!followers) throw new Error("No followers found");
  return NextResponse.json(followers);
}
