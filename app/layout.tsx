import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Mahfil | डीलक्स सैलून",
  description: "A nostalgic retro Indian aesthetic lounge player",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
      </body>
    </html>
  );
}

