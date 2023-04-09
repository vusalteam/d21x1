import { prisma } from "@/app/api/db"

export const getUserGameStats = async (id: number) => {
    const matches = await prisma.match.findMany({where: {winnerId: id}})

}