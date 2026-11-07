import type { Metadata } from "next";
import "./globals.css"; // <-- PASTIKAN TERTULIS RElATIF SEPERTI INI AGAR CSS AKTIF
import Navbar from "../components/Navbar"; // <-- Menyesuaikan letak folder components Anda di luar app

export const metadata: Metadata = {
  title: "IMZPROJECT - Platform Digital",
  description: "Web Client and Admin Control System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-neutral-950 text-white antialiased min-h-screen flex flex-col m-0 p-0">
        <Navbar /> 
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
