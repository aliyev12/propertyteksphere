"use client";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { IProperty } from "@/types/property.types";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import bookmarkProperty from "@/app/actions/bookmark-property";
import checkBookmarkStatus from "@/app/actions/check-bookmark-status";

const BookmarkButton = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error || res.isBookmarked === undefined) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  async function handleClick() {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error || res.isBookmarked === undefined)
        return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  }

  if (loading) {
    return (
      <Button onClick={handleClick} disabled={true}>
        <Bookmark className="mr-1" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (!isBookmarked)
    return (
      <Button onClick={handleClick}>
        <Bookmark className="mr-1" />
        <span>Bookmark property</span>
      </Button>
    );

  return (
    <Button onClick={handleClick} variant="destructive">
      <Bookmark className="mr-1" />
      <span>Remove bookmark</span>
    </Button>
  );
};

export default BookmarkButton;
