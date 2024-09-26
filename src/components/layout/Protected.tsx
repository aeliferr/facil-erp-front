import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/AuthStore'

export function Protected() {
  const firstRenderRef = useRef(true)

  const navigate = useNavigate()
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      const meResponse = await api.get('/me')

      setUser(meResponse.data.user)

      setIsLoading(false)
    }

    if (token && firstRenderRef.current) {
      firstRenderRef.current = false

      loadUserData()
    }
  }, [token, setUser, navigate, location.pathname])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
      </div>
    )
  }

  return <Outlet />
}