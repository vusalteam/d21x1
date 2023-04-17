import { prisma } from "@/app/api/db";
import { getSession } from "@/services/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getSession();
    if (!session) return new NextResponse("Not authenticated", { status: 401 });
    const cId = Number(session.user.id);
    const id = Number(req.url.split("?id=")[1]);
    if (!id) return new NextResponse("Id must be number", { status: 400 });
    if (cId === id) return new NextResponse("Not allowed", { status: 400 });
    const user = await prisma.user.findUnique({
        where: {
            id: cId,
        },
        include:{followings:true}
    });
    const fUser = await prisma.user.findUnique({where: {id}});
    if (!fUser) return new NextResponse("User not found", { status: 400 });
    
    const isExist = user?.followings.some((following) => following.id === +id);

    const followings = await prisma.user.update({
        where: {id: cId},
        data: {followings: { [isExist? "disconnect" : "connect"]: {id: +id}}},
        select:{id:true, followings:{select:{id:true, username:true}}}
    });    
    return NextResponse.json({
        followings
    })
}