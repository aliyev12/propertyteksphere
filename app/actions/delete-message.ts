"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Message from "@/models/Message";
import { IProperty } from "@/types/property.types";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId)
    throw new Error("User ID is required");

  const userId = sessionUser.userId;

  if (!userId) {
    throw new Error("User ID not present. Make sure to sign in.");
  }

  const message = await Message.findById(messageId);

  if (message?.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteMessage;
