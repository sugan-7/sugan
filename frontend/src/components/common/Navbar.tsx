import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-wider text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-court-gold to-court-orange text-court-dark font-black text-lg shadow-md shadow-amber-500/20">
            V
          </span>
          <span className="font-mono tracking-tight text-2xl font-black">VERTEX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <Link href="/how-it-works" className="transition-colors hover:text-court-gold">
            How It Works
          </Link>
          <Link href="/exercises" className="transition-colors hover:text-court-gold">
            Exercise Library
          </Link>
          <Link href="/about" className="transition-colors hover:text-court-gold">
            Evidence & Principles
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-court-gold">
            Roadmap & Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Start Assessment
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
