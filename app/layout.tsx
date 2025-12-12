import "@/app/globals.css";
import { generateTranslatedMetadata } from "@/lib/utils";
import { montserratSans } from "@/lib/fonts";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";
import BodyBackground from "@/components/layout/BodyBackground";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("rootMetadata");
}

/**
 * Root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>

      <body className={`${montserratSans.className} antialiased`}>
        <Providers>
          <NavBar />
          <Toaster richColors />
          <BodyBackground />

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
