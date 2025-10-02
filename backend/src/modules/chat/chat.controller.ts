import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import { IStartConversationDTO, IStartConversationRequestDTO } from "./chat.types";
import chatService from "./chat.service";

class ChatController {
  public async startNewConversation(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { receiverId, initialMessage }: IStartConversationRequestDTO = (request as any).validatedBody;
    const newConversation = await chatService.startNewConversation({ userId, receiverId, initialMessage });
    response.status(HTTP_STATUS.OK).json(newConversation);
    return;
  }

  // public async getConversationMessages
  // public async getConversationDetails
}

const chatController = new ChatController();
export default chatController;
