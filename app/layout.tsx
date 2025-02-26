import type { Metadata } from "next";
import { Inter, Anton } from 'next/font/google'
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})

export const metadata: Metadata = {
  title: "QRFF - Quick Reaction Food Force",
  description: "Mobilizing chefs to feed those in need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.variable} ${anton.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
