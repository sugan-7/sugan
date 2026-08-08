"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Mock quick authentication for seamless athlete experience
    setTimeout(() => {
      if (!email || !password) {
        setError("Please enter your email and password");
        setIsLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("vertex_user_email", email);
      }
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <Card variant="elevated" className="w-full max-w-md border-court-border/80 relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-court-orange via-amber-400 to-orange-500" />

          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Badge variant="orange" size="sm">
                Athlete Access
              </Badge>
            </div>
            <CardTitle className="text-3xl font-athletic uppercase tracking-tight">
              Sign In to VERTEX
            </CardTitle>
            <CardDescription className="text-xs">
              Access your training schedule, Jump Lab, and performance analytics
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="athlete@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2 shadow-glow-orange"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Sign In to Lab
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-court-border/60 text-center text-xs text-muted-foreground">
              New to VERTEX?{" "}
              <Link href="/register" className="text-court-orange hover:text-orange-400 font-bold font-athletic uppercase">
                Start your assessment →
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
