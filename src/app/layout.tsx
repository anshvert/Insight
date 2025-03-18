import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Insight - Your Personalized LLM Interface',
    description: 'A personalized LLM interface to chat with AI models tailored to your needs. Upgrade to premium for advanced models.',
    icons: [
        { rel: 'icon', url: '/favicon.ico' }, // Main favicon
    ],
    openGraph: {
        title: 'Insight - Your Personalized LLM Interface',
        description: 'A personalized LLM interface to chat with AI models tailored to your needs. Upgrade to premium for advanced models.',
        url: 'https://insightsai.tech/',
        siteName: 'Insight',
        images: [
            {
                url: 'https://insightsai.tech/Insight.png',
                width: 800,
                height: 600,
                alt: 'Insight Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Insight - Your Personalized LLM Interface',
        description: 'A personalized LLM interface to chat with AI models tailored to your needs. Upgrade to premium for advanced models.',
        images: ['https://insightsai.tech/Insight.png'],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
