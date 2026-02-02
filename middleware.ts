import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("session")?.value; // example
  if (!isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/employees"; // or /login
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
