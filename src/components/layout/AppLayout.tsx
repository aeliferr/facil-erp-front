import { Link, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import LogoImage from "@/assets/react.svg";
import { useAuthStore } from "@/stores/AuthStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // Utility function for classnames

export function AppLayout() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials);

  function handleSignOut() {
    clearCredentials();
  }

  return (
    <div className="flex h-full w-full antialiased">
      {/* Sidebar/Menu */}
      <div className="w-64 bg-background text-foreground p-4 flex flex-col justify-between h-screen fixed left-0 top-0">
        <div className="flex flex-col space-y-8 overflow-auto">
          {/* Logo */}
          <Link className="flex items-center space-x-2 mb-8" to="/">
            <img src={LogoImage} alt="Mocha" className="w-9" />
            <span className="text-lg font-semibold">Mocha App</span>
          </Link>

          {/* Menu */}
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                "text-foreground hover:bg-accent hover:text-accent-foreground p-2 rounded-md font-medium"
              )}
            >
              Home
            </Link>
            <Link
              to="/budgets"
              className={cn(
                "text-foreground hover:bg-accent hover:text-accent-foreground p-2 rounded-md font-medium"
              )}
            >
              Orçamentos
            </Link>
            <Link
              to="/clients"
              className={cn(
                "text-foreground hover:bg-accent hover:text-accent-foreground p-2 rounded-md font-medium"
              )}
            >
              Clientes
            </Link>
          </nav>
        </div>

        {/* Separator */}
        <Separator className="my-4" />

        {/* Logout Button */}
        <div className="flex items-center justify-center">
          <Button variant="outline" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
