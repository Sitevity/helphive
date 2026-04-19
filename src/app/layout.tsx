import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "TukTukIndia | Vehicle Rental & Local Experiences",
  description: "Discover India with iconic tuk-tuks, scooters, and bikes. Book local experiences, explore heritage sites, and immerse yourself in authentic Indian culture.",
  keywords: "tuktuk, India, vehicle rental, scooter, bike, local experiences, tours, India travel",
  openGraph: {
    title: "TukTukIndia | Vehicle Rental & Local Experiences",
    description: "Discover India with iconic tuk-tuks, scooters, and bikes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex flex-col bg-[var(--color-background)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
