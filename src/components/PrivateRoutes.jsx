import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/UserContext"

export default function PrivateRoutes() {
  const { localAuth } = useAuth()
  return localAuth?.accessToken && localAuth.expiresAt > Date.now() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}
