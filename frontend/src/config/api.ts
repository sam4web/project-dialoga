const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    refresh: "/api/auth/refresh",
    signout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
  },
  users: {
    profile: "/api/users/profile",
    profileImage: "/api/users/profile/image",
    connected: "/api/users/connected",
    unconnected: "/api/users/unconnected",
  },
};

export default apiEndpoints;
