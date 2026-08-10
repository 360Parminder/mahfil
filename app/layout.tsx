import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahfil | डीलक्स सैलून",
  description: "A nostalgic retro Indian aesthetic lounge player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full h-screen w-screen overflow-hidden flex flex-col bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}

