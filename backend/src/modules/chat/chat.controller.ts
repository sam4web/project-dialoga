import { Request, Response } from "express";
import chatService from "./chat.service";
import { HTTP_STATUS } from "../../../../shared/constants";
import { IStartConversationDTO } from "./chat.types";

class ChatController {
  public async startNewConversation(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { receiverId }: IStartConversationDTO = (request as any).validatedBody;
    const newConversation = await chatService.startNewConversation(userId, receiverId);
    response.status(HTTP_STATUS.OK).json(newConversation);
    return;
  }

  // public async getConversationMessages
  // public async getConversationDetails
}

const chatController = new ChatController();
export default chatController;
