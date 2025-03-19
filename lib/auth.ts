import { jwtVerify, SignJWT } from "jose"

// In a real application, this would be stored securely in environment variables
const JWT_SECRET = new TextEncoder().encode("your_jwt_secret_key")

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return { isValid: true, payload }
  } catch (error) {
    return { isValid: false, payload: null }
  }
}

export async function generateToken(payload: any, expiresIn = "1h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET)
}

