import type { Metadata } from "next";
import { Playfair_Display, Poppins, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Calls - Premium Wedding Photography & Event Management",
  description: "Professional wedding photography and event management services. Capturing your special moments with elegance and creativity.",
  keywords: "wedding photography, event management, wedding videography, party photography, ceremony photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${poppins.variable} ${barlow.variable} font-poppins antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
