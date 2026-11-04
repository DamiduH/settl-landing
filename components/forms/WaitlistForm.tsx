"use client";

import { ArrowRight } from "../icons";
import { useFormSubmission } from "./useFormSubmission";

const workTypes = ["Development", "Design", "Writing and content", "Marketing", "Video and photo", "Other"];
const paidVia = ["PayPal", "Payoneer", "Fiverr", "Upwork", "Other"];

export function WaitlistForm({ onDone }: { onDone: () => void }) {
  const { submit, status, errorMessage, sending } = useFormSubmission("waitlist", onDone);
  return (
    <form
      className="mform"
      onSubmit={submit}
      aria-busy={sending}
    >
      <input type="text" name="website" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label>
        Full name
        <input required type="text" name="name" autoComplete="name" pattern=".*\S.*" maxLength={120} />
      </label>
      <label>
        Email
        <input required type="email" name="email" autoComplete="email" maxLength={254} />
      </label>
      <label>
        WhatsApp number
        <input
          required
          type="tel"
          name="whatsapp"
          autoComplete="tel"
          inputMode="tel"
          defaultValue="+94 "
          placeholder="+94 771234567"
          pattern="\+94 [0-9]{9}"
          minLength={13}
          maxLength={13}
          onSelect={(event) => {
            const input = event.currentTarget;
            if ((input.selectionStart ?? 4) < 4) {
              input.setSelectionRange(4, Math.max(4, input.selectionEnd ?? 4));
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const input = event.currentTarget;
            let digits = event.clipboardData.getData("text").replace(/\D/g, "");
            if (digits.startsWith("94") && digits.length === 11) digits = digits.slice(2);
            const start = Math.max(4, input.selectionStart ?? 4);
            const end = Math.max(start, input.selectionEnd ?? start);
            const local = input.value.slice(4);
            input.value = "+94 " + (local.slice(0, start - 4) + digits + local.slice(end - 4)).slice(0, 9);
          }}
          onInput={(event) => {
            const input = event.currentTarget;
            const local = input.value.startsWith("+94") ? input.value.slice(3) : input.value;
            input.value = "+94 " + local.replace(/\D/g, "").slice(0, 9);
          }}
          onKeyDown={(event) => {
            const input = event.currentTarget;
            const start = input.selectionStart ?? 0;
            const end = input.selectionEnd ?? start;
            if ((event.key === "Backspace" && start <= 4 && start === end) ||
                (event.key === "Delete" && start < 4 && start === end)) {
              event.preventDefault();
              input.setSelectionRange(4, 4);
            }
          }}
          title="Enter exactly 9 digits after +94, for example +94 771234567."
        />
      </label>
      <label>
        Type of work
        <select required name="work" defaultValue="">
          <option value="">Choose one</option>
          {workTypes.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </label>
      <fieldset className="mform__set">
        <legend>Where you get paid</legend>
        <div className="mform__checks">
          {paidVia.map((p) => (
            <label className="chk" key={p}>
              <input type="checkbox" name="paid" value={p} /> {p}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="chk">
        <input required type="checkbox" name="consent" /> Settl can contact me about early access.
      </label>
      {status === "error" && (
        <p className="mform__error" role="alert">
          {errorMessage} You can also email{" "}
          <a href="mailto:randeshdaluwatte@gmail.com">randeshdaluwatte@gmail.com</a>.
        </p>
      )}
      <button className="btn mform__submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Join the waitlist"}
        <span className="ar">
          <ArrowRight />
        </span>
      </button>
    </form>
  );
}
