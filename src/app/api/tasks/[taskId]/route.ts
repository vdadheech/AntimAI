// ============================================================
// AntimAI — Task Status Update API Route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasks, cases } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    if (!["pending", "in-progress", "done"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be pending, in-progress, or done" },
        { status: 400 }
      );
    }

    // Fetch the task to verify ownership
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, params.taskId));

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Verify case belongs to user
    const [caseRecord] = await db
      .select()
      .from(cases)
      .where(and(eq(cases.id, task.caseId), eq(cases.userId, userId)));

    if (!caseRecord) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update task status
    const [updatedTask] = await db
      .update(tasks)
      .set({ status })
      .where(eq(tasks.id, params.taskId))
      .returning();

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
