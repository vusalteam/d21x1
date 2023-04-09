import {
  BalanceHistoryOperationType,
  BalanceHistoryTypeType,
  MatchModeType,
  MatchStatusType,
  NatchResultType,
  UserRoleType,
  UserStatusType,
} from "@prisma/client";

export interface ICurrentUser {
  id: number;
  username: string;
  steamId?: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | undefined;
  avatar: string;
  accountType: UserRoleType;
  status?: UserStatusType | null;
  roles?: IRole[];
  balance?: {
    id?: number | undefined;
    amount?: number | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    userId?: number;
  };
}
export interface IUser {
  id: number;
  username: string;
  steamId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date;
  avatar: string;
  accountType: UserRoleType;
  status: UserStatusType;
  roles?: IRole[];
  balance?: IBalance;
  receivedMatches?: IMatch[];
  sentMatches?: IMatch[];
}
export interface ISessionUser {
  id?: number | string | null;
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
  steamId?: string | null;
}
export interface IRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users?: IUser[];
}
export interface IBalance {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  userId?: number;
  history?: IBalanceHistory[];
}
export interface IBalanceHistory {
  id: number;
  description: string;
  type: BalanceHistoryTypeType;
  operation: BalanceHistoryOperationType;
  status: boolean;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  balanceId?: number;
  balance?: IBalance;
}
export interface IMatch {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  steamId?: string;
  result: NatchResultType;
  bet: number;
  mode: MatchModeType;
  status: MatchStatusType;
  recipientId?: number;
  recipient?: IUser;
  senderId?: number;
  sender?: IUser;
}
