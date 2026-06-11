import { NextResponse } from "next/server";
import { getGitlabSummary } from "@/lib/gitlab";

export const revalidate = 21600;

/** Sanitized summary as JSON — handy for debugging and for client widgets. */
export async function GET() {
  const summary = await getGitlabSummary();
  return NextResponse.json(summary);
}
