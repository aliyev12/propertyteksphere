import { ReactElement } from "react";
import "@/assets/styles/globals.css";
import { Metadata } from "next";
import AuthProvider from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/context/global-context";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata: Metadata = {
  title: "Property TEK Sphere",
  keywords: "rental, property, real estate",
  description:
    "Property management portal. Find rental, for sale, and other types of property.",
};

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html suppressHydrationWarning>
          <body>
            <ThemeProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
            </ThemeProvider>
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
