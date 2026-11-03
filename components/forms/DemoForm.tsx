"use client";

import { useState } from "react";
import { ArrowRight } from "../icons";

const ENDPOINT = "https://formsubmit.co/ajax/randeshdaluwatte@gmail.com";

type Status = "idle" | "sending" | "error";

/** Sends demo requests by email through FormSubmit. */
export function DemoForm({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          message: data.get("message"),
          _subject: "Settl demo request",
          _template: "table",
          _captcha: "false",
        }),
      });
      const body = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (!res.ok || String(body?.success) === "false") throw new Error("Request failed");
      onDone();
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form className="mform" onSubmit={submit} aria-busy={sending}>
      <label>
        Name
        <input required type="text" name="name" autoComplete="name" />
      </label>
      <label>
        Email
        <input required type="email" name="email" autoComplete="email" />
      </label>
      <label>
        Organisation (optional)
        <input type="text" name="organisation" autoComplete="organization" />
      </label>
      <label>
        Message (optional)
        <textarea rows={3} name="message" />
      </label>
      {status === "error" && (
        <p className="mform__error" role="alert">
          Something went wrong sending your request. Please try again, or email us at{" "}
          <a href="mailto:randeshdaluwatte@gmail.com">randeshdaluwatte@gmail.com</a>.
        </p>
      )}
      <button className="btn mform__submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Request a demo"}
        <span className="ar">
          <ArrowRight />
        </span>
      </button>
    </form>
  );
}
