import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { Button } from "../components/ui/button";
import {
  Shield,
  LayoutDashboard,
  FileText,
  List,
  Eye,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Settings,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { mockNotifications } from "../data/mock-data";

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const citizenNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/dashboard/report", label: "Report Issue", icon: FileText },
    { path: "/dashboard/my-reports", label: "My Reports", icon: List },
    { path: "/dashboard/explore", label: "Explore", icon: Eye },
    { path: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const adminNavItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/issues", label: "Issue Management", icon: List },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : citizenNavItems;

  return (
    <div className="min-h-screen bg-[#05070A]">
      {/* Header */}
      <header className="bg-[#0B0F14]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/5"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-[#00FF94] to-[#00CC76] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                <Shield className="size-5 text-[#05070A]" />
              </div>
              <span className="text-lg font-bold text-white">CivicSense</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/5">
                  <Bell className="size-5" />
                  {unreadNotifications > 0 && (
                    <div className="absolute -top-1 -right-1 size-5 rounded-full bg-[#00FF94] flex items-center justify-center text-xs text-[#05070A] font-semibold shadow-[0_0_10px_rgba(0,255,148,0.6)] animate-pulse">
                      {unreadNotifications}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-[#11161D] border-white/10">
                <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {mockNotifications.slice(0, 3).map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 text-gray-300 focus:bg-white/5 focus:text-white">
                    <div className="font-medium text-sm">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.issueTitle}</div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-center justify-center text-[#00FF94] focus:bg-[#00FF94]/10 focus:text-[#00FF94]">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-gray-300 hover:text-white hover:bg-white/5">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#11161D] border-white/10">
                <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => navigate("/dashboard/profile")} className="text-gray-300 focus:bg-white/5 focus:text-white">
                  <User className="size-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:bg-white/5 focus:text-white">
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:bg-red-500/10 focus:text-red-300">
                  <LogOut className="size-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Dark Command Center */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0E131A] border-r border-white/5 transition-transform duration-200 ease-in-out`}
        >
          <nav className="p-4 space-y-2 mt-16 lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start relative group ${
                      isActive 
                        ? "bg-[#00FF94]/10 text-[#00FF94] hover:bg-[#00FF94]/15" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF94] rounded-r-full shadow-[0_0_10px_rgba(0,255,148,0.6)]" />
                    )}
                    <Icon className={`size-5 mr-3 ${isActive ? "text-[#00FF94]" : ""}`} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}