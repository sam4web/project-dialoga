export interface IStartConversationDTO {
  receiverId: string;
  initialMessage: string;
}

export interface IAddMessageInConversationDTO {
  conversationId: string;
  messageId: string;
}
