import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { NavBar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

