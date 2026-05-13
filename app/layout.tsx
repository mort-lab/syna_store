import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Syna World | Syna Clothing | Syna Store",
  description:
    "The ONLY official seller of Syna clothing. Everything else is a cheap imitation.",
  openGraph: {
    title: "Syna World",
    type: "website",
    url: "https://www.syna.store/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="font-mono min-h-full">
        <CartProvider>
          <CartDrawer />
          <div
            className="flex flex-col md:grid gap-4 md:gap-8 p-2 md:p-8 mx-auto max-w-[1536px] bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50"
            style={{ gridTemplateColumns: "var(--syna-grid)" }}
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
