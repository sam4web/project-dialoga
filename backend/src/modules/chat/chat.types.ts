import { IStartConversationRequestDTO } from "../../../../shared/types/chat";
export { IStartConversationRequestDTO };

export interface IStartConversationDTO extends IStartConversationRequestDTO {
  userId: string;
}

export interface IAddMessageInConversationDTO {
  conversationId: string;
  messageId: string;
}
