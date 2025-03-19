"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  price: number
}

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) {
        router.push("/login")
        return
      }

      try {
        setIsLoading(true)
        const response = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 401) {
          localStorage.removeItem("accessToken")
          router.push("/login")
          return
        }

        if (!response.ok) throw new Error("Failed to fetch products")

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">{error}</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Back to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

