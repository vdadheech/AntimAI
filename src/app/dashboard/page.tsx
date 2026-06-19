import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cases } from "@/db/schema";
import { eq } from "drizzle-orm";

// ============================================================
// AntimAI — Main Dashboard (List Cases)
// ============================================================

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch all cases for the user
  const userCases = await db
    .select()
    .from(cases)
    .where(eq(cases.userId, userId))
    .orderBy(cases.createdAt);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Cases</h1>
          <p className="text-slate-400">
            Manage your registered post-death administrative cases here.
          </p>
        </div>
        <Link href="/onboard" className="btn-primary flex items-center gap-2">
          <span className="text-lg">+</span> Start New Case
        </Link>
      </div>

      {userCases.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center">
          <div className="text-5xl mb-4">🗂️</div>
          <h2 className="text-2xl font-semibold mb-3">No cases found</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            You haven't registered any cases yet. Start a new case to generate your AI-powered checklist and auto-fill applications.
          </p>
          <Link href="/onboard" className="btn-primary">
            Start a New Case
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCases.map((c) => (
            <Link key={c.id} href={`/dashboard/${c.id}`} className="block">
              <div className="glass-card p-6 h-full hover:border-orange-500/50 transition-colors duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {c.deceasedName}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 bg-white/5 rounded-full text-slate-300">
                    {c.state}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-slate-400 mb-6">
                  <p className="flex justify-between">
                    <span>Date of Death:</span>
                    <span className="text-slate-200">{c.deceasedDod}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Assets:</span>
                    <span className="text-slate-200">{c.assetsJson.length} items</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Created:</span>
                    <span className="text-slate-200">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </p>
                </div>

                <div className="flex items-center text-orange-500 font-medium text-sm mt-auto pt-4 border-t border-white/5">
                  View Dashboard →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
