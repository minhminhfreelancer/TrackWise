import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  Settings,
  LogOut,
  BarChart3,
  PlusCircle,
  Home,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  // This would typically come from auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  };

  return (
    <div
      className={cn(
        "w-[280px] h-full bg-background border-r flex flex-col",
        className,
      )}
    >
      {/* Logo and branding */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">TrackWise</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Website Analytics Dashboard
        </p>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              DASHBOARD
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/visitors">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Visitors
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              WEBSITE
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/websites">
                  <Globe className="mr-2 h-4 w-4" />
                  My Website
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              ACCOUNT
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </ScrollArea>

      {/* User profile section */}
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="User avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="overflow-hidden">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
