import "./globals.css";
import type { Metadata } from "next";
import Providers from "./Providers/Providers.client";
import { Work_Sans } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

const workSans = Work_Sans({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
