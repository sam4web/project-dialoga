import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import chatService from "./chat.service";
import { IStartConversationRequestDTO } from "./chat.types";
import { TGetConversationMessagesSchema } from "./chat.schema";
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
    const { conversationId }: TGetConversationMessagesSchema = (request as any).validatedParams;
    const messages: IMessage[] = await chatService.getConversationMessages({ userId, conversationId });
    response.status(HTTP_STATUS.OK).json(messages);
    return;
  }

  public async getRecipientProfile(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { conversationId }: TGetConversationMessagesSchema = (request as any).validatedParams;
    const recipientProfile = await chatService.getRecipientProfile(conversationId);
    response.status(HTTP_STATUS.OK).json(recipientProfile);
    return;
  }

  // public async getConversationDetails
}

const chatController = new ChatController();
export default chatController;
