"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId: string) {
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

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found");

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
}

export default markMessageAsRead;
