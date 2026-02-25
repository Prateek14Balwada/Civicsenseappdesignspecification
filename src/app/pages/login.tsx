import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router";
import { Shield } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, role: "citizen" | "admin" = "citizen") => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, role);
      toast.success("Login successful!");
      
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 148, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF94] rounded-full blur-[150px] opacity-5" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#00FF94] to-[#00CC76] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,148,0.3)]">
              <Shield className="size-7 text-[#05070A]" />
            </div>
            <span className="text-2xl font-bold text-white">CivicSense</span>
          </Link>
        </div>

        <Card className="bg-[#0B0F14] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <CardHeader>
            <CardTitle className="text-white">Access Command Center</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your CivicSense account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, "citizen")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#11161D] border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF94] focus:ring-[#00FF94]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <a href="#" className="text-sm text-[#00FF94] hover:text-[#00FF94]/80">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#11161D] border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF94] focus:ring-[#00FF94]"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#00FF94] text-[#05070A] hover:bg-[#00FF94]/90 shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_30px_rgba(0,255,148,0.6)] transition-all font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? "Accessing..." : "Sign In"}
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0B0F14] px-2 text-gray-500">Quick Demo Access</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-white/20 text-gray-300 hover:bg-white/5 hover:text-white"
                onClick={(e) => handleSubmit(e, "admin")}
              >
                Sign In as Admin (Demo)
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">Don't have an account? </span>
              <Link to="/register" className="text-[#00FF94] hover:text-[#00FF94]/80 font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}