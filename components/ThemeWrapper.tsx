"use client";

import Nav, { ThemeProvider, useThemeContext } from "@/components/Nav";
import clsx from "clsx";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function InnerWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();

  return (
    <body
      className={clsx(
        `${geistSans.variable} ${geistMono.variable} antialiased`,
        theme
      )}
    >
      <Nav />
      {children}
    </body>
  );
}

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <InnerWrapper>{children}</InnerWrapper>
    </ThemeProvider>
  );
}
