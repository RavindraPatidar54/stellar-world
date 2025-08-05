import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ emailId, password });
    // For demo purposes, redirect to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Left Side - Logo and Text */}
          <div className="hidden lg:flex flex-col items-start space-y-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-dashboard-accent-blue flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <span className="text-4xl font-bold">SnapDrop</span>
            </div>
            <p className="text-xl text-blue-200 max-w-md">
              Lorem ipsum dolor sit
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="h-12 w-12 rounded-lg bg-dashboard-accent-blue flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <span className="text-4xl font-bold text-white">SnapDrop</span>
            </div>

            {/* Login Card */}
            <div className="bg-dashboard-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Email ID"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="bg-dashboard-bg/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dashboard-bg/50 border-border/50 text-foreground placeholder:text-muted-foreground pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-dashboard-accent-blue hover:text-dashboard-accent-blue/80 transition-colors"
                  >
                    Forgot Password
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-dashboard-accent-blue hover:bg-dashboard-accent-blue/90 text-white font-medium py-2.5"
                >
                  LOGIN
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
