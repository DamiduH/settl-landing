"use client";

import { useFormSubmission } from "./useFormSubmission";
import { ArrowRight } from "../icons";

export function DemoForm({ onDone }: { onDone: () => void }) {
  const { submit, status, errorMessage, sending } = useFormSubmission("demo", onDone);

  return (
    <form className="mform" onSubmit={submit} aria-busy={sending}>
      <input type="text" name="website" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label>
        Name
        <input required type="text" name="name" autoComplete="name" pattern=".*\S.*" maxLength={120} />
      </label>
      <label>
        Email
        <input required type="email" name="email" autoComplete="email" maxLength={254} />
      </label>
      <label>
        Organisation (optional)
        <input type="text" name="organisation" autoComplete="organization" maxLength={200} />
      </label>
      <label>
        Message (optional)
        <textarea rows={3} name="message" maxLength={5000} />
      </label>
      {status === "error" && (
        <p className="mform__error" role="alert">
          {errorMessage} You can also email{" "}
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
