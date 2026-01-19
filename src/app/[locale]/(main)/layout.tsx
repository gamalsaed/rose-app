import React from "react";
import Footer from "@/components/layout/app/footer/footer";
import Header from "@/components/layout/app/header/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
