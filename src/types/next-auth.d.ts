import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
      avatar: string;
      steamId: string | null;
      accountType: accountType;
      balance: {
        id: number;
        amount: number;
      }|null;
      roles: [
        {
          id: number;
          name: string;
        }
      ];
    };
  }

}
declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    steamId: string;
    accountType: string;
  }
}
