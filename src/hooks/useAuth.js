"use client"

import { useState, useEffect } from "react"
import { isAuthenticated, logout } from "../utils/api"

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsLoggedIn(authenticated)
      setLoading(false)
    }

    checkAuth()

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "access_token") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
  }

  return {
    isLoggedIn,
    loading,
    logout: handleLogout,
  }
}
