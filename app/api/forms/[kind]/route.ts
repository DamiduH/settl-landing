import { handleSubmission } from "@/lib/forms/server";

export async function POST(request: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (kind !== "waitlist" && kind !== "demo") return Response.json({ error: "Form not found." }, { status: 404 });
  return handleSubmission(request, kind);
}
