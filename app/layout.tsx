import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Spire Conseil",
  description: "Spire accompagne les organisations dans la transformation de leurs pratiques managériales en valorisant l'autonomie, la responsabilité et la prise de décision au juste niveau. Par la subsidiarité, nous faisons du management un levier de performance pour l’entreprise, d’engagement et de bien-être durable pour l'ensemble des collaborateurs.",
  icons: '/spireIcon.ico',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/charter-2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&family=Arial:wght@400;700&family=Roboto:wght@300;400;500;700&family=Barlow+Semi+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: 'var(--color-sc-primary)' }}
        /*style={{
          backgroundImage: 'url(/landscape.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}*/
      >
        {children}
      </body>
    </html>
  );
}
