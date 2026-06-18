// ============================================================
// AntimAI — Sign In Page
// ============================================================

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="animate-slide-up">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-navy-800 border border-white/10 shadow-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
