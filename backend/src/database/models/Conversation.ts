import { model, Schema } from "mongoose";
import { IConversation } from "../types";

const conversationSchema = new Schema<IConversation>(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = model<IConversation>("Conversation", conversationSchema);

export default Conversation;
