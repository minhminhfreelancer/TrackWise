import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "../../lib/utils";

interface DashboardLayoutProps {
  children?: ReactNode;
  className?: string;
}

const DashboardLayout = ({
  children,
  className = "",
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar className="fixed left-0 top-0 h-screen z-30" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-[280px]">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className={cn("flex-1 p-6", className)}>{children}</main>

        {/* Footer */}
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TrackWise Analytics. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
