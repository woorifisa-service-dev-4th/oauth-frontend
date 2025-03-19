"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function NavBar() {
  const pathname = usePathname()
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("accessToken") !== null

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
    }
  }

  // Don't show navbar on login or signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Auth Demo
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className={pathname === "/" ? "text-primary font-medium" : "text-muted-foreground"}>
            Home
          </Link>
          <Link
            href="/products"
            className={pathname === "/products" ? "text-primary font-medium" : "text-muted-foreground"}
          >
            Products
          </Link>

          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

