import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "@/app/_components/header";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LObserver - Running Calories Burned Calculator",
  description:
    "Calculate the calories burned during your runs with LeObserver's running calculator. Track your health and fitness easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmSans.className} bg-emerald-50`}>
        <Header />
        {children}
      </body>
      <GoogleAnalytics gaId="G-K0WMVDDVE0" />
    </html>
  );
}
