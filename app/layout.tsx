import type { Metadata } from "next";
import { Calistoga } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

const calistoga = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-calistoga",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SliceTown",
  description: "SliceTown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`layout-html ${calistoga.variable}`}>
      <body className="layout-body">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
