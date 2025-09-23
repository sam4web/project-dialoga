import { matchPath } from "react-router-dom";

export const isProtected = (pathname: string): boolean => {
  const protectedRoutePatterns = ["/chat", "/chat/new", "/chat/:chatId", "/chat/:chatId/info", "/settings"];

  return protectedRoutePatterns.some((pattern) => matchPath(pattern, pathname));
};
