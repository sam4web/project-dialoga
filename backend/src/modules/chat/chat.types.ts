export interface IStartConversationRequestDTO {
  receiverId: string;
  initialMessage: string;
}

export interface IStartConversationDTO extends IStartConversationRequestDTO {
  userId: string;
}

export interface IAddMessageInConversationDTO {
  conversationId: string;
  messageId: string;
}
