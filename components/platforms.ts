export type Platform = {
  name: string;
  logo: string;
  color: string;
  hideIcon?: boolean;
  /** Fiverr's mark already spells the name, so it is shown on its own. */
  wordmark?: boolean;
};

export const platforms: Platform[] = [
  { name: "PayPal", logo: "/logos/paypal.svg", color: "#003087" },
  { name: "Payoneer", logo: "/logos/payoneer.svg", color: "#FF4800" },
  { name: "Fiverr", logo: "/logos/fiverr.svg", color: "#1DBF73", wordmark: true },
  { name: "Upwork", logo: "/logos/upwork.svg", color: "#14A800", hideIcon: true },
  { name: "Wise", logo: "/logos/wise.svg", color: "#163300" },
];
