import { Model, ObjectId, Schema, Types, model, models } from "mongoose";

export interface IMessage {
  _id: string;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  property: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.set("toJSON", {
  transform: (_, ret) => {
    ret._id = ret._id.toString(); // Convert ObjectId to string
    ret.bookmarks = ret.bookmarks.map((x: Types.ObjectId) => x.toString());
    return ret;
  },
});

const Message: Model<IMessage> =
  models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
