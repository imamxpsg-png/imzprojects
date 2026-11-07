import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMZPROJECT - Admin Control System",
  description: "Panel Kontrol Rahasia Khusus Owner",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mengunci tampilan layout khusus admin agar bersih, tanpa navbar client, dan terisolasi
    <div className="min-h-screen bg-neutral-950 text-white antialiased">
      {children}
    </div>
  );
}
