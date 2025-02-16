import { Model, ObjectId, Schema, Types, model, models } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  image?: string;
  bookmarks: Types.Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, ret) => {
    ret._id = ret._id.toString(); // Convert ObjectId to string
    ret.bookmarks = ret.bookmarks.map((x: Types.ObjectId) => x.toString());
    return ret;
  },
});

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
