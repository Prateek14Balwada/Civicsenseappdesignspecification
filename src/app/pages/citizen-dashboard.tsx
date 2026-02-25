import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/auth-context";
import { mockIssues, mockStats, mockNotifications } from "../data/mock-data";
import { IssueCard } from "../components/issue-card";
import { FileText, CheckCircle, Clock, Award, TrendingUp, Bell, Activity } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export default function CitizenDashboard() {
  const { user } = useAuth();
  const myIssues = mockIssues.filter((issue) => issue.userId === user?.id);
  const recentActivity = mockIssues.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              City Overview
            </h1>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30">
              <div className="size-2 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
              <span className="text-xs font-semibold text-[#00FF94] uppercase tracking-wider">Live Updates Enabled</span>
            </div>
          </div>
          <p className="text-gray-400">Welcome back, {user?.name} · Command Center</p>
        </div>
      </div>

      {/* Stats Cards - Glowing Data Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Reports</p>
                <p className="text-3xl font-bold text-white">{myIssues.length}</p>
              </div>
              <div className="size-12 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all">
                <FileText className="size-6 text-[#00FF94]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Resolved</p>
                <p className="text-3xl font-bold text-[#00FF94]">
                  {myIssues.filter((i) => i.status === "resolved").length}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all">
                <CheckCircle className="size-6 text-[#00FF94]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#F59E0B]/30 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Pending</p>
                <p className="text-3xl font-bold text-[#F59E0B]">
                  {myIssues.filter((i) => i.status !== "resolved" && i.status !== "rejected").length}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">
                <Clock className="size-6 text-[#F59E0B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Trust Score</p>
                <p className="text-3xl font-bold text-[#8B5CF6]">{user?.trustScore}</p>
              </div>
              <div className="size-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                <Award className="size-6 text-[#8B5CF6]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-[#00FF94]" />
              <h2 className="text-xl font-semibold text-white">Live Feed</h2>
            </div>
            <Link to="/dashboard/explore">
              <Button variant="ghost" className="text-[#00FF94] hover:text-[#00FF94]/80 hover:bg-[#00FF94]/10">
                View All →
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((issue) => (
              <IssueCard key={issue.id} issue={issue} compact />
            ))}
          </div>
        </div>

        {/* Notifications & Quick Actions */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="bg-[#0B0F14] border border-white/5">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/report">
                <Button className="w-full justify-start bg-[#00FF94] text-[#05070A] hover:bg-[#00FF94]/90 shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:shadow-[0_0_20px_rgba(0,255,148,0.5)] transition-all font-semibold">
                  <FileText className="size-4 mr-2" />
                  Report New Issue
                </Button>
              </Link>
              <Link to="/dashboard/my-reports">
                <Button variant="outline" className="w-full justify-start border-white/20 text-gray-300 hover:bg-white/5 hover:text-white">
                  <Clock className="size-4 mr-2" />
                  My Reports
                </Button>
              </Link>
              <Link to="/dashboard/explore">
                <Button variant="outline" className="w-full justify-start border-white/20 text-gray-300 hover:bg-white/5 hover:text-white">
                  <TrendingUp className="size-4 mr-2" />
                  Explore Issues
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-[#0B0F14] border border-white/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Bell className="size-5 text-[#00FF94]" />
                  Notifications
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockNotifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 rounded-lg bg-[#11161D] border border-white/5 hover:border-[#00FF94]/30 transition-all cursor-pointer"
                >
                  <p className="text-sm font-medium text-white">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.issueTitle}</p>
                </div>
              ))}
              {mockNotifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="size-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-[#0B0F14] border border-white/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Award className="size-5 text-[#8B5CF6]" />
                Your Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {user?.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#8B5CF6]/5 border border-[#8B5CF6]/30 text-center hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
                  >
                    <Award className="size-6 mx-auto text-[#8B5CF6] mb-1" />
                    <p className="text-xs font-medium text-gray-300">{badge}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}