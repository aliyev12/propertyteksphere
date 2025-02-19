import Link from "next/link";
import { Button } from "./ui/button";
import { ReactElement } from "react";

interface IInfoBoxProps {
  heading: string;
  children: string;
  variant?: "default" | "outline";
  href: string;
  linkText: string;
}

const InfoBox = ({
  heading,
  variant = "default",
  href,
  linkText,
  children,
}: IInfoBoxProps) => {
  return (
    <div className="p-6 rounded-lg shadow-md border flex flex-col">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Button asChild variant={variant} className="mt-auto w-fit">
        <Link href={href}>{linkText}</Link>
      </Button>
    </div>
  );
};

export default InfoBox;
