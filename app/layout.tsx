import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stack OVerFlow",
  description: "App Description here . . .",
  icons: { icon: "/assets/images/site-logo-svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {" "}
          <h1 className="h1-bold">TEXT</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
