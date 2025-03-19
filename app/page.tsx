import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-2 text-lg text-muted-foreground">Authentication and Resource Server Demo</p>
        </div>

        <div className="flex flex-col space-y-4 pt-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full">
            <Link href="/products">View Products</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

