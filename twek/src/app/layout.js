import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
import { AuthProvider } from "../contexts/AuthContext.js";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FASFAS - Brand Marketplace Platform",
  description: "Launch your brand on FASFAS's premier marketplace. Join thousands of successful brands and grow your business with our comprehensive platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-itc-gothic antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
