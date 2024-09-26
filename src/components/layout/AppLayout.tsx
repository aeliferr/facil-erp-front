import { Link, Outlet } from 'react-router-dom'

import { LogOut } from 'lucide-react'

import { useAuthStore } from '@/stores/AuthStore'

import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function AppLayout() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <div className="flex flex-col justify-between">
        <Link className="flex size-[52px] items-center justify-center" to="/">
          {/* <img src={LogoImage} alt="Mocha" className="w-9" /> */}
        </Link>

        <div className="flex size-[52px] items-center justify-center">
          <Button variant="outline" size="icon" onClick={handleSignOut}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}