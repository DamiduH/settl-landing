"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ModalKind = "waitlist" | "demo";

type ModalContextValue = {
  modal: ModalKind | null;
  open: (kind: ModalKind) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalKind | null>(null);
  const open = useCallback((kind: ModalKind) => setModal(kind), []);
  const close = useCallback(() => setModal(null), []);
  const value = useMemo(() => ({ modal, open, close }), [modal, open, close]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
