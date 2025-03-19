import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode("your_jwt_secret_key")

// Mock product database
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality noise-cancelling headphones for an immersive audio experience.",
    price: 249.99,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness goals and stay connected with this feature-rich smart watch.",
    price: 199.99,
  },
  {
    id: "3",
    name: "Wireless Keyboard",
    description: "Ergonomic wireless keyboard with customizable RGB lighting.",
    price: 89.99,
  },
  {
    id: "4",
    name: "Ultra HD Monitor",
    description: "32-inch 4K monitor with HDR support for stunning visuals.",
    price: 349.99,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    try {
      // Verify the token
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // Return the products
      return NextResponse.json(products)
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

