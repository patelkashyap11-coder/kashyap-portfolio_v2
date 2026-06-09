import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import { Navbar }       from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Kashyap Patel — Photographer & Filmmaker",
  description: "Visual stories for brands. Fashion campaigns, restaurant content, jewellery, products and interiors.",
  keywords: ["photographer", "filmmaker", "fashion photography", "commercial photography", "Ahmedabad"],
  openGraph: {
    title: "Kashyap Patel — Photographer & Filmmaker",
    description: "Visual stories for brands — fashion, food, jewellery, products, interiors.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
