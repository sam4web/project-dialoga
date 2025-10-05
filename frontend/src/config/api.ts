const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    refresh: "/api/auth/refresh",
    signout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
  },
  users: {
    me: "/api/users/me",
    meImage: "/api/users/me/image",
    profile: (id: string) => `/api/users/${id}`,
    partner: "/api/users/partner",
    unassociated: "/api/users/unassociated",
  },
  chat: {
    start: "/api/chat/conversations",
    recipient: (conversationId: string) => `/api/chat/conversations/${conversationId}/recipient`,
    messages: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages`,
    textMessage: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages/text`,
    imageMessage: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages/image`,
  },
};

export default apiEndpoints;
