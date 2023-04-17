import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth( async function middleweare(req:NextRequest) {
  const token = await getToken({req});
  const pathname = req.nextUrl.pathname;
  const isAuthPages = pathname.startsWith("/auth");
  const authPage = "/auth/signin";
  const homePage = "/";
  const protectedPages = ['/profile', '/users','/api'];
  const isProtectedPage = protectedPages.some((route) => pathname.startsWith(route));
  if (isAuthPages && token) return NextResponse.redirect(new URL(homePage,req.url));
  if (isProtectedPage && !token) return NextResponse.redirect(new URL(authPage,req.url));
  if (pathname === "/") return NextResponse.next();
  return NextResponse.next();
},
{
  callbacks: {
    authorized: () => true
  },
}
)

export const config = {
  matcher: ["/","/auth/:path*","/users/:path*","/profile/:path*","/api/:path*"]
};