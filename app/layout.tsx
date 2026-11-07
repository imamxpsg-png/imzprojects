import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Pastikan arah impor ini sudah sesuai

export const metadata: Metadata = {
  title: "Givery Japan Clone",
  description: "Web Client and Admin System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-gray-950 text-white antialiased min-h-screen flex flex-col">
        {/* Navbar diletakkan di luar tag main agar selalu berada di posisi paling atas halaman apa pun */}
        <Navbar /> 
        
        {/* Tag main membungkus konten utama halaman agar tidak tertutup oleh navbar fixed */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
