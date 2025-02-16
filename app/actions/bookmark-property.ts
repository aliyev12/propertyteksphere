"use server";
import connectDB from "@/config/database";
import User, { IUser } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(
  propertyId: string
): Promise<{ message?: string; isBookmarked?: boolean; error?: string }> {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const bookmarks = user.bookmarks.map((x) => x.toString());

  let isBookmarked: boolean = bookmarks.includes(propertyId);
  let message: string;

  if (isBookmarked) {
    // If already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    // If not bookmarked, then add
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/property/saved", "page");

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
