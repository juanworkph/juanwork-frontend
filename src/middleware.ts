import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/auth/signup",
  "/auth/signup/client",
  "/auth/signup/freelancer",
  "/landing/about",
  "/landing/contact",
  "/landing/help",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static files, API routes, and Next.js internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Check if the current route is public
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith("/landing/"),
  );

  // 3. Get the access token and user role from cookies
  const token = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // 4. Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/auth", request.url);
    // loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Role-based protection: Check if user is accessing another role's route
  if (token && userRole) {
    const isFreelancerRoute = pathname.startsWith("/freelancer");
    const isClientRoute = pathname.startsWith("/client");
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthRoute = pathname.startsWith("/auth");

    // Prevent authenticated users from accessing login/signup
    if (isAuthRoute) {
      if (userRole === "freelancer")
        return NextResponse.redirect(new URL("/freelancer", request.url));
      if (userRole === "client")
        return NextResponse.redirect(new URL("/client", request.url));
      if (userRole === "admin")
        return NextResponse.redirect(new URL("/admin", request.url));
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Prevent cross-role navigation
    if (userRole === "freelancer" && (isClientRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/freelancer", request.url));
    } else if (userRole === "client" && (isFreelancerRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/client", request.url));
    } else if (userRole === "admin" && (isFreelancerRoute || isClientRoute)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
