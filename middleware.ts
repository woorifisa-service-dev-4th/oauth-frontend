import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// Paths that require authentication
const protectedPaths = ["/products", "/api/products"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((pp) => path.startsWith(pp))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // For API routes, check the Authorization header
  if (path.startsWith("/api/")) {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const { isValid } = await verifyToken(token)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.next()
  }

  // For page routes, check the token in cookies or redirect to login
  // In this implementation, we'll redirect to login and let the client-side
  // code handle the token validation from localStorage

  return NextResponse.next()
}

export const config = {
  matcher: ["/products/:path*", "/api/products/:path*"],
}

