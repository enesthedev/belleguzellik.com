import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://belleguzellik.com"),
  title: {
    default: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon Hizmetleri",
    template: "%s | Belle Güzellik",
  },
  description:
    "Belle Güzellik ile profesyonel cilt bakımı, lazer epilasyon ve güzellik hizmetlerinden yararlanın. Uzman kadro, modern teknoloji. Hemen randevu alın.",
  keywords: [
    "güzellik salonu",
    "lazer epilasyon",
    "cilt bakımı",
    "profesyonel bakım",
    "güzellik merkezi",
    "epilasyon",
    "makyaj",
    "belle güzellik",
  ],
  authors: [{ name: "Belle Güzellik" }],
  creator: "Belle Güzellik",
  publisher: "Belle Güzellik",
  alternates: {
    canonical: "https://belleguzellik.com",
  },
  openGraph: {
    title: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon",
    description:
      "Belle Güzellik ile profesyonel cilt bakımı, lazer epilasyon ve güzellik hizmetlerinden yararlanın. Uzman kadro, modern teknoloji.",
    url: "https://belleguzellik.com",
    siteName: "Belle Güzellik",
    images: [
      {
        url: "/media/cover-makeup-video-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Belle Güzellik - Profesyonel Güzellik Merkezi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon",
    description: "Belle Güzellik ile profesyonel cilt bakımı, lazer epilasyon ve güzellik hizmetlerinden yararlanın.",
    images: ["/media/cover-makeup-video-thumbnail.png"],
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
    google: "google-site-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Belle Güzellik",
  description: "Profesyonel cilt bakımı, lazer epilasyon ve güzellik hizmetleri sunan modern güzellik salonu.",
  url: "https://belleguzellik.com",
  telephone: "+905438966543",
  image: "https://belleguzellik.com/media/cover-makeup-video-thumbnail.png",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.0082",
    longitude: "28.9784",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Güzellik Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lazer Epilasyon",
          description: "Profesyonel lazer epilasyon hizmeti",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cilt Bakımı",
          description: "Profesyonel cilt bakımı ve tedavisi",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${outfit.variable} ${cormorant.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="relative flex flex-col font-sans antialiased">{children}</body>
    </html>
  );
}
