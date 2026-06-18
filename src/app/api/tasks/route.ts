// ============================================================
// AntimAI — Tasks List API Route (for fetching tasks by caseId)
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasks, cases } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const caseId = req.nextUrl.searchParams.get("caseId");
    if (!caseId) {
      return NextResponse.json(
        { error: "caseId query parameter is required" },
        { status: 400 }
      );
    }

    // Verify case belongs to user
    const [caseRecord] = await db
      .select()
      .from(cases)
      .where(and(eq(cases.id, caseId), eq(cases.userId, userId)));

    if (!caseRecord) {
      return NextResponse.json(
        { error: "Case not found or unauthorized" },
        { status: 404 }
      );
    }

    const caseTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.caseId, caseId));

    return NextResponse.json({ tasks: caseTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
