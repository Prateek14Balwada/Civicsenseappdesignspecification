import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router";
import { FileText, Eye, CheckCircle2, TrendingUp, Shield, Users, Activity } from "lucide-react";
import { IssueCard } from "../components/issue-card";
import { mockIssues, mockStats } from "../data/mock-data";

export default function Landing() {
  const trendingIssues = mockIssues.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#05070A] relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 148, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00FF94] rounded-full blur-[150px] opacity-5" />

      {/* Header */}
      <header className="relative border-b border-white/5 bg-[#0B0F14]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#00FF94] to-[#00CC76] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,148,0.3)]">
              <Shield className="size-6 text-[#05070A]" />
            </div>
            <span className="text-xl font-bold text-white">CivicSense</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#00FF94] text-[#05070A] hover:bg-[#00FF94]/90 shadow-[0_0_20px_rgba(0,255,148,0.3)] font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0F14] border border-white/10 mb-8 shadow-[0_0_20px_rgba(0,255,148,0.15)]">
            <div className="size-2 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_10px_rgba(0,255,148,0.8)]" />
            <span className="text-xs font-semibold text-[#00FF94] uppercase tracking-wider">System Operational</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            Empower Your City.<br />In Real Time.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Report, track, and monitor civic issues with transparency. A command center for modern city governance.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 bg-[#00FF94] text-[#05070A] hover:bg-[#00FF94]/90 shadow-[0_0_30px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.6)] transition-all font-semibold">
                Report Issue
              </Button>
            </Link>
            <Link to="/dashboard/explore">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/5 hover:border-[#00FF94]/50">
                Explore Issues
              </Button>
            </Link>
          </div>

          {/* Live Stats - Glowing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {mockStats.totalIssues.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Total Issues Reported</div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-[#00FF94] mb-2 drop-shadow-[0_0_10px_rgba(0,255,148,0.5)]">
                  {mockStats.resolvedIssues.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Issues Resolved</div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-[#3B82F6] mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {mockStats.avgResolutionTime}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Avg Resolution (Days)</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-20">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="size-24 rounded-2xl bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 border border-[#00FF94]/30 flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_40px_rgba(0,255,148,0.3)] transition-all duration-300">
                <FileText className="size-12 text-[#00FF94]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">1. Report</h3>
              <p className="text-gray-400 leading-relaxed">
                Snap a photo and describe the issue in your community. Add location and severity details.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="size-24 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/5 border border-[#F59E0B]/30 flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-300">
                <Eye className="size-12 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">2. Track</h3>
              <p className="text-gray-400 leading-relaxed">
                Follow your issue and receive real-time updates as it moves through the resolution process.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="size-24 rounded-2xl bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 border border-[#00FF94]/30 flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_40px_rgba(0,255,148,0.3)] transition-all duration-300">
                <CheckCircle2 className="size-12 text-[#00FF94]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">3. See Resolution</h3>
              <p className="text-gray-400 leading-relaxed">
                Get notified when your issue is resolved and see the positive impact on your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Issues */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Activity className="size-8 text-[#00FF94]" />
              <h2 className="text-4xl font-bold text-white">Live Issues</h2>
            </div>
            <Link to="/dashboard/explore">
              <Button variant="ghost" className="text-[#00FF94] hover:text-[#00FF94]/80 hover:bg-[#00FF94]/10">
                View All →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </section>

      {/* Why CivicSense */}
      <section className="relative py-20 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Why CivicSense?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="size-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 border border-[#00FF94]/30 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] transition-all">
                <Shield className="size-8 text-[#00FF94]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Trustworthy</h3>
              <p className="text-gray-400 leading-relaxed">
                Government-grade security and reliability you can count on.
              </p>
            </div>
            
            <div className="group">
              <div className="size-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                <Users className="size-8 text-[#3B82F6]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Community-Driven</h3>
              <p className="text-gray-400 leading-relaxed">
                Your voice matters. Join thousands making a difference.
              </p>
            </div>
            
            <div className="group">
              <div className="size-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/5 border border-[#F59E0B]/30 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all">
                <TrendingUp className="size-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Efficient</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time tracking and faster resolution of community issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5 bg-[#0B0F14]/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 rounded-lg bg-gradient-to-br from-[#00FF94] to-[#00CC76] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                  <Shield className="size-5 text-[#05070A]" />
                </div>
                <span className="text-lg font-bold text-white">CivicSense</span>
              </div>
              <p className="text-gray-500 text-sm">
                Making cities better, one report at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Explore</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#00FF94] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2026 CivicSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}