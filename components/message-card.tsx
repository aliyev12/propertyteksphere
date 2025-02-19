import { IMessagePopulated } from "@/app/(root)/messages/page";
import { IMessage } from "@/models/Message";
import { Button } from "./ui/button";
import { Check, Trash } from "lucide-react";

const MessageCard = ({ message }: { message: IMessagePopulated }) => {
  return (
    <div className="relative p-4 rounded-md shadow-md border">
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
        <Button>
          <Check /> Mark as read
        </Button>
        <Button variant="destructive">
          <Trash /> Delete
        </Button>
      </div>
    </div>
  );
};

export default MessageCard;
