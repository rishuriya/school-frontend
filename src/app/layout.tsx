import type { Metadata, Viewport } from "next";
import "./globals.css";
import { mockSchoolInfo } from "../data/mockData";

export const metadata: Metadata = {
  title: `${mockSchoolInfo.name} - ${mockSchoolInfo.tagline}`,
  description: mockSchoolInfo.description,
  keywords: "school, education, academy, learning, students, faculty, programs, events, CBSE, Catholic school",
  authors: [{ name: mockSchoolInfo.name }],
  robots: "index, follow",
  icons: {
    icon: mockSchoolInfo.logo,
    shortcut: mockSchoolInfo.logo,
    apple: mockSchoolInfo.logo,
  },
  openGraph: {
    title: `${mockSchoolInfo.name} - ${mockSchoolInfo.tagline}`,
    description: mockSchoolInfo.description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: mockSchoolInfo.logo || "/Kochas%20Logo.JPG",
        width: 1200,
        height: 630,
        alt: `${mockSchoolInfo.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${mockSchoolInfo.name} - ${mockSchoolInfo.tagline}`,
    description: mockSchoolInfo.description,
    images: [mockSchoolInfo.logo || "/Kochas%20Logo.JPG"],
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
