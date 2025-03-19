"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem("accessToken")
    if (token) {
      setAccessToken(token)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("accessToken", token)
    setAccessToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAccessToken(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

