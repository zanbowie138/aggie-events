import React from 'react'
import './globals.css'

import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ToastRenderer } from "@/components/toast/ToastRenderer";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ToastRenderer } from "@/components/toast/ToastRenderer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen relative">
        <AuthProvider>
          <Header />
          <ToastRenderer />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
