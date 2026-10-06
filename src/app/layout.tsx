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
        {/* Motion prerenders Reveal and Stagger blocks at opacity 0 and shows them once JS runs.
            Without JS they would stay hidden, so noscript cancels the inline style. */}
        <noscript>
          <style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <Nav />
        {children}
      </body>
    </html>
  );
}
