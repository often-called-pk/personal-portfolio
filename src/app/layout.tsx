import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { profile } from "@/content/profile";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.headline}`,
  description: profile.sub,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // With global `scroll-behavior: smooth`, Next 16 only keeps route changes
    // instant (anchors stay smooth) when data-scroll-behavior is set.
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
