import { IStartConversationRequestDTO } from "../../../../shared/types/chat";
import { IConversation, IMessage } from "../../database";
export { IStartConversationRequestDTO };

export interface IStartConversationDTO extends IStartConversationRequestDTO {
  userId: string;
}

export interface IConversationContext {
  conversation: IConversation;
  receiverId: string;
}

export interface IAddMessageInConversationDTO {
  conversation: IConversation;
  message: IMessage;
}

export interface IConversationIdParamsDTO {
  userId: string;
  conversationId: string;
}

export interface ISendTextMessageDTO extends IConversationIdParamsDTO {
  message: string;
}
