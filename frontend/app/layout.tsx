import React from "react";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ToastRenderer } from "@/components/toast/ToastRenderer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen relative">
        <ToastRenderer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
