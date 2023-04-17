import { Balance, UserRole, UsersOnRoles } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      avatar: string;
      email: string;
      steamId: string | null;
      accountType: UserRole;
      balance: {
        id: number;
        amount: number;
      } | null;
      roles: [
        {
          id: number;
          name: string;
        }
      ];
    };
  }
  interface User {
    id: number;
    username: string;
    avatar: string;
    email: string;
    steamId: string | null;
    accountType: UserRole;
    balance: Balance | null;
    roles: UsersOnRoles[];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    steamId: string;
    accountType: UserRole;
  }
}
