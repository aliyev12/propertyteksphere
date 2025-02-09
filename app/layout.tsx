import { ReactElement } from "react";
import "@/assets/styles/globals.css";
import { Metadata } from "next";
import AuthProvider from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Property TEK Sphere",
  keywords: "rental, property, real estate",
  description:
    "Property management portal. Find rental, for sale, and other types of property.",
};

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
