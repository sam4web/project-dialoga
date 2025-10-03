export interface IMessage {
  _id: string;
  receiverId: string;
  text: string | null;
  image: string | null;
  type: "image" | "text";
  createdAt: Date;
  updatedAt: Date;
}
