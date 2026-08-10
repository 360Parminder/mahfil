import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mahfil.parminder.pro'),
  title: "Mahfil | एक सुरीली शाम",
  description: "A nostalgic retro Indian aesthetic lounge player",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Mahfil | एक सुरीली शाम",
    description: "A nostalgic retro Indian aesthetic lounge player",
    siteName: "Mahfil",
    images: [
      {
        url: "https://res.cloudinary.com/dvo4tvvgb/image/upload/v1786394847/Profile/mahfil_wfx2rg.png",
        width: 1200,
        height: 630,
        alt: "Mahfil",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahfil | एक सुरीली शाम",
    description: "A nostalgic retro Indian aesthetic lounge player",
    images: ["https://res.cloudinary.com/dvo4tvvgb/image/upload/v1786394847/Profile/mahfil_wfx2rg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx('h-full', 'antialiased', 'dark')}>
      <body className={clsx('min-h-full', 'h-screen', 'w-screen', 'overflow-hidden', 'flex', 'flex-col', 'bg-black', 'text-white', 'font-sans')}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

