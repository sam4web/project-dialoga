import { model, Schema } from "mongoose";
import { IImageMessage, IMessage } from "../types";

const imageMessageSchema = new Schema<IImageMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const messageSchema = new Schema<IMessage>(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["image", "text"],
      required: true,
    },
    text: {
      type: String,
      required: function () {
        return this.type === "text";
      },
      trim: true,
    },
    image: {
      type: imageMessageSchema,
      required: function () {
        return (this as unknown as IMessage).type === "image";
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;
