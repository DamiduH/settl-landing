"use client";

import { ArrowRight } from "../icons";

const workTypes = ["Development", "Design", "Writing and content", "Marketing", "Video and photo", "Other"];
const paidVia = ["PayPal", "Payoneer", "Fiverr", "Upwork", "Other"];

/** Front end only for now: shows the success state without sending anything. */
export function WaitlistForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      className="mform"
      onSubmit={(e) => {
        e.preventDefault();
        onDone();
      }}
    >
      <label>
        Full name
        <input required type="text" name="name" autoComplete="name" />
      </label>
      <label>
        Email
        <input required type="email" name="email" autoComplete="email" />
      </label>
      <label>
        WhatsApp number
        <input required type="tel" name="whatsapp" autoComplete="tel" defaultValue="+94 " />
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
      <button className="btn mform__submit" type="submit">
        Join the waitlist
        <span className="ar">
          <ArrowRight />
        </span>
      </button>
    </form>
  );
}
