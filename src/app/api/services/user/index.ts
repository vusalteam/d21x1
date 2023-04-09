import { prisma } from "@/app/api/db";
import User from "@/app/matches/page";
import {
  BalanceHistoryOperationType,
  BalanceHistoryTypeType,
  UserRoleType,
  UserStatusType,
} from "@prisma/client";
export const selectObject = {
  select: {
    id: true,
    username: true,
    email: true,
    steamId: true,
    createdAt: true,
    updatedAt: true,
    balance: { select: { history: true } },
    receivedMatches: true,
    sentMatches: true,
    tokens: true,
    roles: true,
  },
};
export class createObjectDto {
  // @ts-ignore
  steamId: string;
  // @ts-ignore
  username: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  password: string;
}

export const createUser = async (dto: createObjectDto) => {
  return await prisma.user.create({
    data: {
      ...dto,
      status: UserStatusType.OFFLINE,
      balance: { create: {} },
      roles:{
        connectOrCreate:{
            where:{id:1},
            create:{role:{create:{name:"Зарегистрированный",}}},
        }
      }
    },
    ...selectObject,
  });
};
export const getUser = async (id: number) => {
  return await prisma.user.findUnique({ where: { id: id }, ...selectObject });
};
export const getAccount = async (id: number) => {
  return await prisma.user.findUnique({ where: { id: id } });
};
export const getUserBySteamId = async (steamId: string) => {
  return await prisma.user.findUnique({ where: { steamId }, ...selectObject });
};
export const getUsers = async () => {
  return await prisma.user.findMany({ ...selectObject });
};
export const updateUserBalance = async (
  userId: number,
  amount: number,
  description: string = "",
  type: BalanceHistoryTypeType,
  operation: BalanceHistoryOperationType
) => {
  const balance = await prisma.balance.findUnique({ where: { userId } });
  if (!balance) return false;
  return await prisma.balance.update({
    where: { userId },
    data: {
      amount:
        type === BalanceHistoryTypeType.INCOME
          ? balance.amount + amount
          : balance.amount - amount,
      history: { create: { type, operation, amount, description } },
    },
    ...selectObject,
  });
};
export const toggledUserRole = async (id: number, roleId: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: { include: { role: true } } },
  });
  if (!user) return false;
  const roles = await prisma.role.findUnique({ where: { id } });
  if (!roles) return false;
  const isExist = await prisma.usersOnRoles.findFirst({
    where: { roleId, userId: id },
  });
  if (isExist) {
    await prisma.usersOnRoles.delete({ where: { id: isExist.id } });
  } else {
    await prisma.usersOnRoles.create({ data: { userId: id, roleId } });
  }
  return await prisma.user.findUnique({ where: { id }, ...selectObject });
};
export const toggleOnlineStatus = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) return false;
  return await prisma.user.update({
    where: { id: id },
    data: {
      status:
        user?.status === UserStatusType.ONLINE
          ? UserStatusType.OFFLINE
          : UserStatusType.ONLINE,
    },
    ...selectObject,
  });
};
export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id: id }, ...selectObject });
};
