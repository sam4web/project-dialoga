import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import chatService from "./chat.service";
import { IStartConversationRequestDTO } from "./chat.types";

class ChatController {
  public async startNewConversation(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { receiverId, initialMessage }: IStartConversationRequestDTO = (request as any).validatedBody;
    const userProfile = await chatService.startNewConversation({ userId, receiverId, initialMessage });
    response.status(HTTP_STATUS.OK).json(userProfile);
    return;
  }

  // public async getConversationMessages
  // public async getConversationDetails
}

const chatController = new ChatController();
export default chatController;
