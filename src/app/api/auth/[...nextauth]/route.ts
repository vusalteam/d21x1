import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/api/db";
import { compare, hash } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { adapter } from "next/dist/server/web/adapter";
import { UserStatus } from "@prisma/client";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Sign In",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.password)
          throw new Error("Invalid credentials");
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email },
          include: { roles: true, balance: true },
        });
        if (!user) throw new Error("Invalid username or password");
        const passwordIsCorrect = await compare(password, user.password);
        if (!passwordIsCorrect) {
          throw new Error("Invalid username or password");
        }
        return {
          id: user.id + "",
          username: user.username,
          email: user.email,
          steamId: user.steamId,
          roles: user.roles,
          balance: user.balance,
          avatar: user.avatar,
          accountType: user.accountType,
        };
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Sign Up",
      credentials: {
        username: {},
        email: {},
        password: {},
        rePassword: {},
        steamId: {},
      },
      async authorize(credentials, req) {
        if (
          !credentials?.username &&
          !credentials?.email &&
          !credentials?.password &&
          !credentials?.rePassword
        )
          return null;
        const { username, email, password, rePassword } = credentials;
        let steamId = "";
        if (credentials?.steamId) steamId = credentials.steamId;
        const emailExist = await prisma.user.findUnique({
          where: { email },
        });
        if (emailExist) return null;
        const usernameExist = await prisma.user.findUnique({
          where: { username },
        });
        if (usernameExist) return null;
        if (password !== rePassword) return null;
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: await hash(password, 12),
            steamId,
            balance: {
              create: {},
            },
            roles: {
              connectOrCreate: {
                where: { id: 1 },
                create: { role: { create: { name: "Зарегистрированный" } } },
              },
            },
          },
          include: { roles: true, balance: true },
        });
        return {
          id: user.id + "",
          username: user.username,
          email: user.email,
          steamId: user.steamId,
          roles: user.roles,
          balance: user.balance,
          avatar: user.avatar,
        };
      },
    }),
  ],
  events: {
    signIn: async ({ user }) => {
      await prisma.user.update({
        where: { email: user.email as string },
        data: { status: UserStatus.ONLINE },
      });
    },
    signOut: async ({ token: user }) => {
      await prisma.user.update({
        where: { email: user.email as string },
        data: { status: UserStatus.OFFLINE },
      });
    },
  },
  callbacks: {
    session: ({ session, token }) => {
      //console.log("Session Callback", { token });
      if (token) {
        const t = token as unknown as any;
        return {
          ...session,
          user: {
            ...session.user,
            id: t.id,
            username: t.username,
            steamId: t.steamId,
            roles: t.roles,
            balance: t.balance,
            avatar: t.avatar,
            accountType: t.accountType,
          },
        };
      }
      return session;
    },
    jwt: ({ token, user, account }) => {
      //console.log("account",account);
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          roles: u.roles,
          balance: u.balance,
          username: u.username,
          steamId: u.steamId,
          avatar: u.avatar,
          accountType: u.accountType,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
    newUser: "/auth/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    //async encode() {},
    //async decode() {},
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
