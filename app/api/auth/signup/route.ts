import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would be a database
const users = [{ id: "1", username: "user1", email: "user1@example.com", password: "password1" }]

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 })
    }

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password, // In a real app, this would be hashed
    }

    // Add to users array (in a real app, save to database)
    users.push(newUser)

    // Return success without exposing password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({ message: "User created successfully", user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

