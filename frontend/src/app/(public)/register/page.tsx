"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("vertex_user_name", `${firstName} ${lastName}`);
        localStorage.setItem("vertex_user_email", email);
      }
      router.push("/onboarding");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <Card variant="elevated" className="w-full max-w-md border-court-border/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-court-gold via-amber-400 to-court-orange" />

          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Badge variant="gold" size="sm">
                Athlete Registration
              </Badge>
            </div>
            <CardTitle className="text-3xl font-athletic uppercase tracking-tight">
              Create Athlete Profile
            </CardTitle>
            <CardDescription className="text-xs">
              Step 1: Create your secure account to start the 8-step baseline assessment
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  placeholder="Stephen"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Curry"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

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
                label="Create Password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                helperText="Must contain at least 8 alphanumeric characters"
                required
              />

              <div className="flex items-start gap-2 p-3 rounded-xl bg-court-card border border-court-border text-[11px] text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-court-gold shrink-0 mt-0.5" />
                <span>
                  Your training data is stored securely in PostgreSQL with UTC timestamps and private athlete isolation.
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2 shadow-glow-orange"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Create Account & Begin Assessment
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-court-border/60 text-center text-xs text-muted-foreground">
              Already registered?{" "}
              <Link href="/login" className="text-court-gold hover:underline font-bold font-athletic uppercase">
                Sign in to your dashboard →
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
