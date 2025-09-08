import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bright Future Academy - Empowering Minds, Building Futures",
  description: "A premier educational institution committed to academic excellence, character development, and innovative learning. Join our community and discover your potential.",
  keywords: "school, education, academy, learning, students, faculty, programs, events",
  authors: [{ name: "Bright Future Academy" }],
  robots: "index, follow",
  openGraph: {
    title: "Bright Future Academy - Empowering Minds, Building Futures",
    description: "A premier educational institution committed to academic excellence, character development, and innovative learning.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright Future Academy - Empowering Minds, Building Futures",
    description: "A premier educational institution committed to academic excellence, character development, and innovative learning.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
