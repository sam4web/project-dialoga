import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import chatService from "./chat.service";
import { IStartConversationRequestDTO } from "./chat.types";
import { TConversationIdSchema, TSendTextMessageSchema } from "./chat.schema";
import { IMessage } from "../../database";

class ChatController {
  public async startNewConversation(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { receiverId, initialMessage }: IStartConversationRequestDTO = (request as any).validatedBody;
    const recepient = await chatService.startNewConversation({ userId, receiverId, initialMessage });
    response.status(HTTP_STATUS.OK).json(recepient);
    return;
  }

  public async getConversationMessages(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { conversationId }: TConversationIdSchema = (request as any).validatedParams;
    const messages: IMessage[] = await chatService.getConversationMessages({ userId, conversationId });
    response.status(HTTP_STATUS.OK).json(messages);
    return;
  }

  public async getRecipientProfile(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { conversationId }: TConversationIdSchema = (request as any).validatedParams;
    const recipientProfile = await chatService.getRecipientProfile({ userId, conversationId });
    response.status(HTTP_STATUS.OK).json(recipientProfile);
    return;
  }

  public async sendTextMessage(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { conversationId }: TConversationIdSchema = (request as any).validatedParams;
    const { message }: TSendTextMessageSchema = (request as any).validatedBody;
    const messageData = await chatService.sendTextMessage({ userId, conversationId, message });
    response.status(HTTP_STATUS.OK).json(messageData);
    return;
  }

  public async sendImageMessage(request: Request, response: Response) {
    response.status(HTTP_STATUS.OK).json({ message: "Send Image Message" });
    return;
  }
  // public async getConversationDetails
}

const chatController = new ChatController();
export default chatController;
