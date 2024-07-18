import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Protect the /admin route
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // Protect the /checkout route
    if (
      request.nextUrl.pathname.startsWith("/checkout") &&
      !request.nextauth.token?.email
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/checkout/:path*"] };

// export function middleware(request: Request) {

//   // Store current request url in a custom header, which you can read later
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set('x-url', request.url);

//   return NextResponse.next({
//     request: {
//       // Apply new request headers
//       headers: requestHeaders,
//     }
//   });
// }
