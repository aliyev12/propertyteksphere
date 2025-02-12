import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { IProperty } from "@/types/property.types";

const BookmarkButton = ({ property }: { property: IProperty }) => {
  return (
    <Button>
      <Bookmark className="mr-1" />
      <span>Bookmark Property</span>
    </Button>
  );
};

export default BookmarkButton;
