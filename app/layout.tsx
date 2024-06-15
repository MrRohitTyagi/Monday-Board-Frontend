import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import "./nprogress.css";

import Authorize from "@/components/core/Authorize";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/nprogress@0.2.0/nprogress.js"
          defer
        ></script>
      </head>
      <body
        className={
          figtree.className +
          " " +
          `max-h-dvh min-h-dvh w-screen bg-main-bg overflow-hidden`
        }
      >
        <Authorize>{children}</Authorize>
        <Toaster />
      </body>
    </html>
  );
}
