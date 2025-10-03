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
    connected: "/api/users/connected",
    unconnected: "/api/users/unconnected",
  },
  chat: {
    startConversation: "/api/chat/conversations",
  },
};

export default apiEndpoints;
