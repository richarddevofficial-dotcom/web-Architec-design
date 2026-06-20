import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Emmanuella Designs & Architects | Architectural Excellence",
  description:
    "Professional architectural and design services. Transforming spaces, creating experiences. Residential, commercial, interior, and landscape design.",
  keywords:
    "architecture, design, interior design, landscape, renovation, commercial design, architectural firm",
  authors: [{ name: "Emmanuella Designs" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Emmanuella Designs & Architects",
    description: "Professional architectural and design services",
    type: "website",
    locale: "en_US",
    siteName: "Emmanuella Designs & Architects",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <ScrollToTop />
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
