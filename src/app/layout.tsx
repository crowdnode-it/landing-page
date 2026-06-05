import type { Metadata } from "next";
import { Fragment_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env.local to enable GA4 reporting.
// Events are always logged to the browser console regardless of this variable.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parity",
  description: "Persona-specific startup investing landing pages for Parity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[16px] leading-[1.3] tracking-[-0.02em] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]">
        {children}
        {GA_ID && (
          <>
            {/* Inline — runs synchronously so gtag + config are ready before any useEffect fires.
                The external script loads async; events queued before it arrives are replayed. */}
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}} />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
