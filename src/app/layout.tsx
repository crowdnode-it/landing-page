import type { Metadata } from "next";
import { Fragment_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env.local to enable GA4 reporting.
// Events are always logged to the browser console regardless of this variable.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

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
              gtag('config', '${GA_ID}', { send_page_view: false});
            `}} />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
        {META_PIXEL_ID && (
          <>
            {/* Inline so fbq exists before PageAnalytics effects fire; the external
                script loads async and replays queued events. */}
            <script dangerouslySetInnerHTML={{ __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${JSON.stringify(META_PIXEL_ID)});
              fbq('track', 'PageView');
            `}} />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
