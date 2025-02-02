import { ReactElement } from "react";
import "@/assets/styles/globals.css";
import { Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Property TEK Sphere",
  keywords: "rental, property, real estate",
  description:
    "Property management portal. Find rental, for sale, and other types of property.",
};

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
