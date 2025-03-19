import { type NextRequest, NextResponse } from "next/server"

// In a real application, these would be stored securely
const CLIENT_ID = "your_client_id"
const CLIENT_SECRET = "your_client_secret"

// Mock user database
const users = [{ username: "user1", password: "password1" }]

// Store generated codes temporarily (in a real app, use Redis or another store)
const authCodes = new Map()

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate user credentials
    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate a random code
    const code = Math.random().toString(36).substring(2, 15)

    // Store the code with user info (expires in 10 minutes)
    authCodes.set(code, {
      username,
      expiresAt: Date.now() + 10 * 60 * 1000,
    })

    // Return the code
    return NextResponse.json({ code })
  } catch (error) {
    console.error("Error generating auth code:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

