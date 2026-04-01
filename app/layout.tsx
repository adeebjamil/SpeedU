// import type { Metadata, Viewport } from "next";
// import "./globals.css";
// import ClientShell from "./components/client-shell";

// /* ── SEO metadata ── */
// export const metadata: Metadata = {
//   title: "SpeedUp Aviation — Instant Drone Delivery",
//   description:
//     "SpeedUp delivers anything in minutes using autonomous, zero-emission drones. Ultra-fast, safe, and sustainable on-demand delivery operating in 12 countries.",
//   keywords: [
//     "drone delivery",
//     "autonomous delivery",
//     "instant delivery",
//     "zero emission delivery",
//     "last mile logistics",
//     "SpeedUp",
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
//   openGraph: {
//     title: "SpeedUp Aviation",
//     description:
//       "Autonomous drones that deliver in minutes, not hours — sustainably and safely.",
//     type: "website",
//     locale: "en_US",
//     siteName: "SpeedUp",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "SpeedUp — Instant Drone Delivery",
//     description: "Zero-emission autonomous drone delivery. Now in 12 countries.",
//   },
//   robots: { index: true, follow: true },
// };

// export const viewport: Viewport = {
//   themeColor: "#ffffff",
//   width: "device-width",
//   initialScale: 1,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Preconnect to Google Fonts for faster font loading */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         {/* eslint-disable-next-line @next/next/no-page-custom-font */}
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
//           rel="stylesheet"
//         />
//         {/* DNS prefetch for any external resources */}
//         <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
//       </head>
//       <body className="antialiased bg-white text-[#1e40af]">
//         <ClientShell>
//           {children}
//         </ClientShell>
//       </body>
//     </html>
//   );
// }


import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientShell from "./components/client-shell";

/* ── SEO metadata ── */
export const metadata: Metadata = {
  title: "SpeedUp Aviation — Instant Drone Delivery",
  description:
    "SpeedUp delivers anything in minutes using autonomous, zero-emission drones. Ultra-fast, safe, and sustainable on-demand delivery operating in 12 countries.",
  keywords: [
    "drone delivery",
    "autonomous delivery",
    "instant delivery",
    "zero emission delivery",
    "last mile logistics",
    "SpeedUp",
  ],

  // ── Favicon & icons configuration ──
  icons: {
    // Standard favicon (most browsers)
    icon: "/favicon.svg",                    // → <link rel="icon" href="/favicon.ico" />

    // Apple Touch Icon (iOS home screen, iPad, etc.)
    apple: "/apple-touch-icon.png",          // → <link rel="apple-touch-icon" href="..." sizes="180x180" />

    // Optional: shortcut icon (older Windows/IE support)
    shortcut: "/favicon.svg",

    // Optional: multiple icons with different sizes or types (recommended for production)
    // icon: [
    //   { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    //   { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    //   { url: '/favicon.ico', sizes: 'any' },
    // ],
  },

  // Open Graph / Social sharing image → usually your logo
  openGraph: {
    title: "SpeedUp Aviation",
    description:
      "Autonomous drones that deliver in minutes, not hours — sustainably and safely.",
    type: "website",
    locale: "en_US",
    siteName: "SpeedUp",
    // Most common choice: use your logo here (recommended size: 1200×630)
    images: ["/logo.jpg"],   // or ["/og-image.jpg"]
  },

  twitter: {
    card: "summary_large_image",
    title: "SpeedUp — Instant Drone Delivery",
    description: "Zero-emission autonomous drone delivery. Now in 12 countries.",
    // Twitter also uses openGraph.images when card = summary_large_image
  },

  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* DNS prefetch for any external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased bg-white text-[#1e40af]">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}