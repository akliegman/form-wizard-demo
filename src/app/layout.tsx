import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import styles from "./layout.module.scss";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "300, 400, 500",
});

export const metadata: Metadata = {
  title: "Form Demo",
  description: "Written by Adam Kliegman",
};

export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(`${geistSans.variable}`, styles.body)}>
        {children}
      </body>
    </html>
  );
}
