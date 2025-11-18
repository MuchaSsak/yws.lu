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

/**
 * TODO: These things
 * * Finish the "Meet the Team" section in About Us page
 * * Partnered logos marquee
 * * Create the "We Spark Projects" page
 * * Record tutorial video for adding/updating projects, statistics or house gallery images in Supabase for the YWS team
 * * Configure Vercel domain to run under `yws.lu` (as well as `yws-lu.vercel.app` as an alternative)
 * * Check if Google SEO indexes the website properly once fully deployed into production. Make sure the metadata works
 *
 * ?.
 * * Replace placeholder images for houses pictures in the DB storage bucket
 * * Create the Google My Maps map showing all of the shared houses locations for the "Real impact" section in About Us page
 */
