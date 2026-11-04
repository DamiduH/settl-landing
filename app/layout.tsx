import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./styles/motion.css";
import "./styles/logo.css";
import "./styles/buttons.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/modal.css";
import "./styles/mobile.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const description =
  "Settl turns your alternative income and the reliability you've already shown into a credit score lenders can read. No payslip needed.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://settl-lk.vercel.app"),
  title: "Settl | Your work adds up",
  description,
  applicationName: "Settl",
  openGraph: {
    type: "website",
    siteName: "Settl",
    title: "Settl | Your work adds up",
    description,
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Settl | Your work adds up",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#DCEAFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Hide reveal targets before first paint so they don't flash in and out. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-ready')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
