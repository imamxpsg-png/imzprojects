import type { Metadata } from "next";
import "./globals.css"; 
import Navbar from "../components/Navbar"; 

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
      <body className="bg-neutral-950 text-white antialiased min-h-screen flex flex-col m-0 p-0 overflow-y-auto">
        <Navbar /> 
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
