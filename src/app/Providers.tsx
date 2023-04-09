"use client";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  session: Session | null;
}
export function NextAuthProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
