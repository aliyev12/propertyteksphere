import connectDB from "@/config/database";
import Message, { IMessage } from "@/models/Message";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/message-card";
import { IProperty } from "@/types/property.types";

export interface IMessagePopulated extends Omit<IMessage, "property"> {
  property: IProperty;
}

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const userId = sessionUser?.userId;

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages: IMessagePopulated[] = [
    ...unreadMessages,
    ...readMessages,
  ].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });

  return (
    <section className="">
      <div className="container m-auto py-6 md:py-8 lg:py-24 max-w-6xl">
        <div className="px-6 py-8 mb-4 shadow-md border rounded-md m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message, i) => (
                <MessageCard
                  message={{
                    ...message,
                    property: message.property as IProperty,
                  }}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
