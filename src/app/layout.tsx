import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Cup Cafe",
  description: "A premium cinematic experience — walk through the doors of Happy Cup Cafe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#1a0f0a] text-[#f5e6d3] antialiased">{children}</body>
    </html>
  );
}
