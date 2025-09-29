const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    refresh: "/api/auth/refresh",
    signout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
  },
  users: {
    myProfile: "/api/users/me",
    myProfileImage: "/api/users/me/image",
    connected: "/api/users/connected",
    unconnected: "/api/users/unconnected",
  },
};

export default apiEndpoints;
