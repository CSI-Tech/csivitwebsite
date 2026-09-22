import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CSI VIT — The Insider",
  description:
    "Computer Society of India, VIT Student Chapter. Tenure 2026–27. Where logic meets deception.",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&family=Caveat:wght@500;700&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen paper-texture text-ink antialiased">
        <Providers>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
