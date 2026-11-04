export type FormKind = "waitlist" | "demo";

const workTypes = ["Development", "Design", "Writing and content", "Marketing", "Video and photo", "Other"];
const paymentPlatforms = ["PayPal", "Payoneer", "Fiverr", "Upwork", "Other"];

export function validateSubmission(kind: FormKind, value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid form data.");
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number, required = true) => {
    const raw = input[key];
    if (raw !== undefined && typeof raw !== "string") throw new Error(`Invalid ${key}.`);
    const result = typeof raw === "string" ? raw.trim() : "";
    if ((required && !result) || result.length > max) throw new Error(`Please check your ${key}.`);
    return result;
  };
  const name = text("name", 120);
  const email = text("email", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
  const requestId = text("request_id", 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    throw new Error("Please refresh the page and try again.");
  }

  if (kind === "demo") {
    return { name, email, request_id: requestId, organisation: text("organisation", 200, false), message: text("message", 5000, false) };
  }

  const whatsapp = text("whatsapp", 13);
  if (!/^\+94 ?[0-9]{9}$/.test(whatsapp)) throw new Error("Enter exactly 9 digits after +94.");
  const work = text("work", 50);
  if (!workTypes.includes(work)) throw new Error("Choose a type of work.");
  if (input.consent !== undefined && input.consent !== false && input.consent !== true && input.consent !== "on") {
    throw new Error("Invalid contact preference.");
  }
  const consent = input.consent === true || input.consent === "on";
  const paid = input.paid ?? [];
  if (!Array.isArray(paid) || paid.length > paymentPlatforms.length || paid.some((item) => typeof item !== "string" || !paymentPlatforms.includes(item))) {
    throw new Error("Choose valid payment platforms.");
  }
  const otherDetails: Record<string, string> = {};
  if (work === "Other") otherDetails.work_other = text("work_other", 200);
  if (paid.includes("Other")) otherDetails.paid_other = text("paid_other", 200);
  return { name, email, request_id: requestId, whatsapp: whatsapp.replace(/ /g, ""), work_type: work, payment_platforms: [...new Set(paid)], consent, ...(!consent ? { consent_at: null } : {}), ...otherDetails };
}
