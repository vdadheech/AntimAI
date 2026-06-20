"use client";

// ============================================================
// AntimAI — Navbar Component
// ============================================================

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-colors duration-300"
      style={{
        background: "rgba(28, 23, 20, 0.85)", // academia-bg
        borderColor: "var(--academia-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="default" />
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-6">
            <SignedIn>
              <Link
                href="/dashboard"
                className="font-display uppercase text-xs tracking-widest text-academia-muted-fg hover:text-academia-accent transition-all duration-300 hover:tracking-[0.25em]"
              >
                My Cases
              </Link>
              <Link
                href="/onboard"
                className="btn-secondary hidden sm:inline-flex"
              >
                New Case
              </Link>
              <div className="ring-2 ring-academia-accent/30 rounded-full p-0.5">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-full",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="font-display uppercase text-xs tracking-widest text-academia-muted-fg hover:text-academia-accent transition-all duration-300 hover:tracking-[0.25em]">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-primary">
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
