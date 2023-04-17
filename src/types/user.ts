import { MatchResult, UserRole, UserStatus } from "@prisma/client";

export interface ISafeUser {
  id: number
  username: string
  avatar: string
  email: string
  steamId: string | null
  accountType: UserRole
  status: UserStatus 
  statusMessage: string
  createdAt: string
  updatedAt: string
}

export interface IProfileUser {
  id: number;
  username: string;
  avatar: string;
  status: UserStatus;
  steamId: string;
  statusMessage: string;
  accountType: UserRole;
  roles: IRole[];
  balance: IBalance;
  winsCount: number;
  lossesCount: number;
  gamesCount: number;
  mathces: IMatch[];
  followers: IUser[];
  followings: IUser[];
}
export interface IUser {
  id: number;
  username: string;
  avatar: string;
  status: UserStatus;
}
export interface IRole {
  id: number;
  name: string;
}
export interface IBalance {
  id: number;
  amount: number;
}
export interface IMatch {
  id: number;
  winnerId: number;
  bet: number;
  result: MatchResult;
  sender: IUser;
  recipientId: number;
}
