import type { Metadata } from "next";
import { Noto_Serif, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/context/MusicContext";

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boda de Denis & Lizbeth",
  description: "Nuestra historia - Denis y Lizbeth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${notoSerif.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
