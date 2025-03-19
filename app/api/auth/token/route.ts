import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

// In a real application, these would be stored securely
const CLIENT_ID = "your_client_id"
const CLIENT_SECRET = "your_client_secret"
const JWT_SECRET = new TextEncoder().encode("your_jwt_secret_key")

// Reference to the authCodes map from the code route
// In a real app, this would be a shared database or Redis
const authCodes = new Map()

export async function POST(request: NextRequest) {
  try {
    const { code, client_id, client_secret } = await request.json()

    // Validate client credentials if provided
    if (client_id && client_secret) {
      if (client_id !== CLIENT_ID || client_secret !== CLIENT_SECRET) {
        return NextResponse.json({ error: "Invalid client credentials" }, { status: 401 })
      }
    }

    // Validate the code
    const codeData = authCodes.get(code)

    if (!codeData) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    // Check if code is expired
    if (codeData.expiresAt < Date.now()) {
      authCodes.delete(code)
      return NextResponse.json({ error: "Code expired" }, { status: 400 })
    }

    // Delete the used code
    authCodes.delete(code)

    // Generate JWT token
    const accessToken = await new SignJWT({
      username: codeData.username,
      role: "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(JWT_SECRET)

    return NextResponse.json({
      accessToken,
      tokenType: "Bearer",
      expiresIn: 3600,
    })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

