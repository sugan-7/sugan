import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Athlete Sign In</CardTitle>
            <CardDescription>
              Access your training schedule, Jump Lab, and performance analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="athlete@example.com"
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                required
              />
              <Button variant="primary" size="md" className="w-full mt-2">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-xs text-muted-foreground">
              New athlete?{" "}
              <Link href="/register" className="text-court-gold hover:underline font-semibold">
                Start your assessment
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
