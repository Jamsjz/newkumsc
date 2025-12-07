import './codewave.css';

// Note: siteConfig contains React components (icons), so we define static SEO here
// to avoid client-side only imports in metadata

export const metadata = {
  metadataBase: new URL('https://code-wave.pages.dev'),
  title: "Infinity CodeWave | Nepal's Premier Computational Mathematics Hackathon",
  description: "Join Infinity CodeWave on April 24-25, 2026 at Kathmandu University. A 48-hour hackathon where mathematics meets code. Part of KUMSC's annual Infinity event. Free admission for all students!",
  keywords: [
    "hackathon",
    "CodeWave",
    "Kathmandu University",
    "KUMSC",
    "mathematics hackathon",
    "Nepal hackathon",
    "coding competition",
    "computational mathematics",
    "AI hackathon",
    "student hackathon",
    "free hackathon Nepal"
  ],
  authors: [{ name: "KUMSC", url: "https://kumsc.org" }],
  creator: "Kathmandu University Mathematics Students' Club",
  publisher: "KUMSC",
  openGraph: {
    title: "Infinity CodeWave | Where Math Meets Code",
    description: "Join Nepal's premier computational mathematics hackathon on April 24-25, 2026. Part of KUMSC's annual Infinity event. Free admission!",
    url: "https://codewave.kumsc.org",
    siteName: "Infinity CodeWave",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeWave 3.0 - Nepal's Premier Computational Mathematics Hackathon"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity CodeWave | Nepal's Premier Hackathon",
    description: "48-hour hackathon where mathematics meets code. April 24-25, 2026 at Kathmandu University. Part of KUMSC's Infinity event!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Add verification tokens when available
    // google: "verification_token",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0510" />
      </head>
      <body className="bg-[#0a0510] text-[#E6E1F0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
