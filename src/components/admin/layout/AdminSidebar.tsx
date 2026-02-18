import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Mail, Briefcase, FileText, BarChart3, Settings, LogOut, X, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Mail, label: "Contacts", path: "/admin/contacts" },
  { icon: Briefcase, label: "Requests", path: "/admin/requests" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: FileText, label: "Blogs", path: "/admin/blogs" },
  { icon: FileText, label: "Portfolio", path: "/admin/portfolio" },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar = ({ isOpen = true, onClose }: AdminSidebarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen
        w-64 bg-card/95 backdrop-blur-xl border-r border-border/50
        flex flex-col shadow-2xl lg:shadow-none
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border/50 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Management Dashboard</p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden -mr-2"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/20 shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:border hover:border-border/50"
                }`
              }
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
