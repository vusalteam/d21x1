import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/api/db";
import { getServerSession, unstable_getServerSession } from "next-auth";


export async function getSession() {
  return await unstable_getServerSession(authOptions);
}
export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null
    const user = await prisma.user.findUnique({where: {email: session?.user?.email as string},include:{balance:true}});
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
};