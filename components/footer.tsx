import { Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo-min.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-8 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="mb-4 md:mb-0 md:mr-5">
            <Image src={logo} alt="Logo" className="h-8 w-auto" />
          </div>
          <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/properties" className="link">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-8 mx-auto w-full flex justify-center items-center">
          <span className="mr-3">&copy; {currentYear} Abdul Aliyev</span>
          <Button asChild size="sm">
            <a href="https://www.aaliyev.com/contact" target="_blank">
              <Mail size="10" />
              Get in touch
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
