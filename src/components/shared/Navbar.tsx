"use client";

// ============================================================
// AntimAI — Navbar Component
// ============================================================

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: "rgba(10, 22, 40, 0.85)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="default" />
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link
                href="/onboard"
                className="btn-secondary text-sm hidden sm:inline-flex"
              >
                + New Case
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 rounded-full ring-2 ring-accent/30",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="btn-secondary text-sm">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-primary text-sm">
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
