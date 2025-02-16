"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(
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
  console.log("bookmarks = ", bookmarks);

  let isBookmarked: boolean = bookmarks.includes(propertyId);
  return { isBookmarked };
}

export default checkBookmarkStatus;
