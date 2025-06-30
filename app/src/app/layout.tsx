import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/ui/navbar";
import I18NWrapper from "@/components/i18n-provider";
import { ThemeProvider } from "next-themes";
import FooterSection from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meta Software - Your professional web & mobile app development choice",
  description: "Meta Software is a full-service web and mobile app development company that specializes in creating cutting-edge solutions for businesses and individuals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader>
            <I18NWrapper>
              <Navbar />
              {children}
              <FooterSection />
            </I18NWrapper>
          </Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
