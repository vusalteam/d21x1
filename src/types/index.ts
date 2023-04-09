import { BalanceHistoryOperationType, BalanceHistoryTypeType, MatchModeType, MatchStatusType, NatchResultType, UserRoleType, UserStatusType } from "@prisma/client";

export interface IUser{
    id: number;
    username: string;
    steamId: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: Date;
    avatar:string;
    accountType:UserRoleType;
    status:UserStatusType;
    roles?: IRole[];
    balance?: IBalance;
    receivedMatches?: IMatch[];
    sentMatches?: IMatch[];
}
export interface IRole{
    id: number;
    name:string;
    createdAt: Date;
    updatedAt: Date;
    users?: IUser[];
}
export interface IBalance{
    id: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    user?: IUser;
    userId?: number;
    history?: IBalanceHistory[];
}
export interface IBalanceHistory{
    id: number;
    description:string;
    type:BalanceHistoryTypeType;
    operation:BalanceHistoryOperationType;
    status:boolean;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    balanceId?: number;
    balance?: IBalance;
}
export interface IMatch{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    steamId?:string;
    result:NatchResultType;
    bet: number;
    mode:MatchModeType;
    status:MatchStatusType;
    recipientId?: number;
    recipient?: IUser;
    senderId?: number;
    sender?: IUser;
}