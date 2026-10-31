import type { Metadata } from "next";
//import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
//import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar/Navbar";



export const metadata: Metadata = {
  title: "Dashboard",
  description: "My Inventory System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
     
    >
      <ClerkProvider>
        <body className="min-h-full flex flex-col"><Navbar/>{children}</body>
      </ClerkProvider>
    </html>
  );
}
