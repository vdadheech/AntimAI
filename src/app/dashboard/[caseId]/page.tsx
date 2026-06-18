// ============================================================
// AntimAI — Dashboard Page
// ============================================================

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { cases } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import DashboardView from "@/components/dashboard/DashboardView";

interface DashboardPageProps {
  params: { caseId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch case data server-side
  const [caseRecord] = await db
    .select()
    .from(cases)
    .where(and(eq(cases.id, params.caseId), eq(cases.userId, userId)));

  if (!caseRecord) {
    redirect("/onboard");
  }

  return (
    <DashboardView
      caseId={caseRecord.id}
      deceasedName={caseRecord.deceasedName}
      heirsName={caseRecord.heirsName}
    />
  );
}
