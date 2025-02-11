import { IProperty } from "@/types/property.types";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

const ShareButtons = ({ property }: { property: IProperty }) => {
  return (
    <Button variant="secondary">
      <Share /> Share properties
    </Button>
  );
};

export default ShareButtons;
