import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Manuella Architects | Architecture • Interior • Planning",
  description:
    "Premium architectural design, interior design, and planning consultancy. Transforming spaces with innovative and sustainable design solutions.",
  keywords:
    "architecture, interior design, planning, consultancy, architectural firm, building design, renovation",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo-icon.svg",
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
