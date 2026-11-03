"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Cross } from "./icons";
import { Logo } from "./Logo";
import { useModal } from "./ModalProvider";
import { WaitlistForm } from "./forms/WaitlistForm";

const done = {
  waitlist: {
    title: "You're on the list.",
    text: "We'll message you as soon as a lender starts accepting Settl scores.",
  },
  demo: {
    title: "Thanks.",
    text: "We'll reply within a day to set a time.",
  },
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal() {
  const { modal, close } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Each time a modal opens it starts on the form, not the success state.
  const [openedFor, setOpenedFor] = useState(modal);
  if (modal !== openedFor) {
    setOpenedFor(modal);
    setSubmitted(false);
  }

  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [modal, close]);

  if (!modal) return null;

  const heading = modal === "waitlist" ? "Join the waitlist" : "Book a demo";

  return (
    <div
      className="modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div ref={dialogRef} className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__logo">
          <Logo height={26} />
        </div>
        <button type="button" className="modal__close" onClick={close} aria-label="Close">
          <Cross />
        </button>

        {submitted ? (
          <div className="modal__done" role="status">
            <div className="modal__tick">
              <Check size={32} color="#fff" weight={2.6} />
            </div>
            <h2 id="modal-title" className="modal__title">
              {done[modal].title}
            </h2>
            <p className="modal__donetext">{done[modal].text}</p>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="modal__title">
              {heading}
            </h2>
            {modal === "waitlist" && (
              <>
                <p className="modal__sub">Just your details. No account access needed.</p>
                <WaitlistForm onDone={() => setSubmitted(true)} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
