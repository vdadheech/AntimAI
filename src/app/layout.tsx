// ============================================================
// AntimAI — Root Layout
// ============================================================

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, Crimson_Pro, Cinzel } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "AntimAI — Post-Death Administrative Assistant",
  description:
    "Navigate life's hardest paperwork with AI-powered guidance. AntimAI helps Indian families manage post-death legal and financial tasks with step-by-step checklists and auto-generated application letters.",
  keywords: [
    "death administration",
    "legal heir",
    "succession certificate",
    "Indian post-death procedures",
    "claim settlement",
    "insurance claim",
    "bank account closure",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable} ${cinzel.variable}`}>
      <body className="min-h-screen bg-academia-bg text-academia-fg font-body antialiased">
        <div className="paper-texture" />
        <div className="vignette-overlay" />
        
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#C9A962", // Brass
              colorBackground: "#1C1714", // Mahogany
              colorInputBackground: "#251E19", // Aged Oak
              colorInputText: "#E8DFD4", // Parchment
              colorText: "#E8DFD4", // Parchment
              colorTextSecondary: "#9C8B7A", // Faded Ink
              colorDanger: "#8B2635", // Crimson
            },
            elements: {
              card: "border border-[#4A3F35] shadow-2xl bg-[#251E19]",
              formButtonPrimary:
                "bg-[linear-gradient(180deg,#D4B872_0%,#C9A962_50%,#B8953F_100%)] text-[#1C1714] hover:brightness-110",
              navbar: "hidden", // We use our own navbar
              userButtonPopoverActionButtonText: "!text-[#E8DFD4]",
              userButtonPopoverActionButtonIcon: "!text-[#C9A962]",
              userButtonPopoverActionButton: "hover:bg-[#251E19] !text-[#E8DFD4]",
            },
          }}
        >
          <Navbar />
          <main className="pt-16 relative z-10">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
