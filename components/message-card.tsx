"use client";
import { IMessagePopulated } from "@/app/(root)/messages/page";
import { IMessage } from "@/models/Message";
import { Button } from "./ui/button";
import { Check, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/mark-message-as-read";
import { Badge } from "./ui/badge";
import deleteMessage from "@/app/actions/delete-message";
import { useGlobalContext } from "@/context/global-context";

const MessageCard = ({ message }: { message: IMessagePopulated }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  async function handleDeleteClick() {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount: number) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message deleted");
  }

  async function handleReadClick() {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnreadCount((prevCount: number) =>
      read ? prevCount - 1 : prevCount + 1
    );
    toast.success(`Marked as ${read ? "read" : "new"}`);
  }

  if (isDeleted) {
    return <p>Deleted message</p>;
  }

  return (
    <div className="relative p-4 rounded-md shadow-md border">
      {!isRead && (
        <Badge variant="secondary" className="absolute top-2 right-2">
          New
        </Badge>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p>{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="link">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="link">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <div className="flex flex-col space-y-3 mt-4 sm:space-y-0 sm:space-x-3 sm:flex-row sm:items-center">
        <Button onClick={handleReadClick}>
          <Check /> {isRead ? "Mark as new" : "Mark as read"}
        </Button>
        <Button variant="destructive" onClick={handleDeleteClick}>
          <Trash /> Delete
        </Button>
      </div>
    </div>
  );
};

export default MessageCard;
