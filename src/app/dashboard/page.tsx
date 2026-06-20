import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Library, ArrowRight } from "lucide-react";

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
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-12 max-w-7xl mx-auto pt-24 sm:pt-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 pb-6 border-b border-academia-border relative">
        <div className="absolute bottom-[-1px] left-0 w-32 h-[1px] bg-academia-accent" />
        
        <div>
          <span className="font-display text-xs text-academia-accent uppercase tracking-[0.3em] block mb-2">
            Ledger Index
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl mb-2 text-academia-fg">Active Cases</h1>
          <p className="font-body text-academia-muted-fg text-lg">
            Manage your registered post-death administrative cases here.
          </p>
        </div>
        <Link href="/onboard" className="btn-primary flex items-center gap-2 shrink-0">
          Establish New Case
        </Link>
      </div>

      {userCases.length === 0 ? (
        <div className="glass-card p-16 text-center flex flex-col items-center corner-flourish">
          <div className="w-16 h-16 rounded-full border border-academia-accent/30 bg-academia-bg flex items-center justify-center mb-6 shadow-inner">
            <Library className="w-6 h-6 text-academia-accent" />
          </div>
          <h2 className="font-heading text-3xl mb-4 text-academia-fg">The Ledger is Empty</h2>
          <p className="font-body text-academia-muted-fg max-w-md mx-auto mb-10 text-lg">
            You haven&apos;t established any cases yet. Start a new case to generate your personalized checklist and documentation.
          </p>
          <Link href="/onboard" className="btn-secondary">
            Commence Process
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userCases.map((c) => (
            <Link key={c.id} href={`/dashboard/${c.id}`} className="block group">
              <div className="glass-card p-8 h-full corner-flourish bg-academia-bg-alt/80 hover:bg-academia-bg-alt transition-colors duration-500">
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-academia-border">
                  <h3 className="font-heading text-2xl text-academia-fg group-hover:text-academia-accent transition-colors">
                    {c.deceasedName}
                  </h3>
                  <span className="font-display text-[10px] uppercase tracking-widest px-3 py-1 border border-academia-accent/20 bg-academia-accent/5 rounded-full text-academia-accent">
                    {c.state}
                  </span>
                </div>
                
                <div className="space-y-3 font-body text-base text-academia-muted-fg mb-8">
                  <div className="flex justify-between items-center border-b border-academia-border/50 pb-2">
                    <span className="italic">Date of Passing</span>
                    <span className="text-academia-fg font-medium">{c.deceasedDod}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-academia-border/50 pb-2">
                    <span className="italic">Registered Assets</span>
                    <span className="text-academia-fg font-medium">{c.assetsJson.length} entries</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="italic">Ledger Created</span>
                    <span className="text-academia-fg font-medium">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-academia-accent font-display text-xs uppercase tracking-widest mt-auto group-hover:tracking-[0.2em] transition-all duration-300">
                  Inspect Ledger <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
