import { prisma } from "@/app/api/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MatchStatus } from "@prisma/client";


export async function getSession() {
  return await getServerSession(authOptions);
}
export async function getCurrentUser(fields: object = {include:{balance:true}}) {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null
    const user = await prisma.user.findUnique({where: {email: session?.user?.email},...fields});
    if (!user) return null;
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString(),
      balance:{
        ...user.balance,
        updatedAt: user.balance?.updatedAt.toISOString(),
        createdAt: user.balance?.createdAt.toISOString(),
      }
    }
  } catch (error) {
    return null
  }
}
export const getGames = async (id: number) => {
    const allMatches = await prisma.match.findMany({where:{senderId:id,recipientId:id,status: MatchStatus.FINISHED}})
    const matchesCount = allMatches.length
    const sentMatches = allMatches.filter((match) => match.senderId === id)
    const recpientMatches = allMatches.filter((match) => match.recipientId === id)
    const winsCount = allMatches.filter((match) => match.winnerId === id).length
    const lossesCount = allMatches.filter((match) => match.winnerId !== id).length
    return {
        matchesCount,
        winsCount,
        lossesCount,
        sentMatches,
        recpientMatches
    }
}