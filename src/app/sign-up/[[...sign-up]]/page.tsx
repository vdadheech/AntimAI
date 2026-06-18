// ============================================================
// AntimAI — Sign Up Page
// ============================================================

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="animate-slide-up">
        <SignUp
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
