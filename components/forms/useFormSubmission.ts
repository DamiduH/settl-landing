"use client";

import { useEffect, useRef, useState } from "react";

/** Only report success after the server confirms database storage. */
export function useFormSubmission(kind: "waitlist" | "demo", onDone: () => void) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const request = useRef<AbortController | null>(null);
  const requestId = useRef<string | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current) return;
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const fields: Record<string, string | string[]> = {};
    for (const key of new Set(data.keys())) {
      const values = data.getAll(key).map((value) => String(value).trim());
      fields[key] = key === "paid" ? values : values[0];
    }
    requestId.current ??= crypto.randomUUID();
    fields.request_id = requestId.current;
    const controller = new AbortController();
    request.current = controller;
    setStatus("sending");
    setErrorMessage("");
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`/api/forms/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify(fields),
      });
      const body = await response.json();
      if (!response.ok || body?.success !== true) {
        throw new Error(typeof body?.error === "string" ? body.error : "We couldn’t save your details. Please try again.");
      }
      if (!controller.signal.aborted) onDone();
    } catch (error) {
      setErrorMessage(controller.signal.aborted ? "The request timed out. Please try again." : error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      request.current = null;
    }
  }

  return { submit, status, errorMessage, sending: status === "sending" };
}
