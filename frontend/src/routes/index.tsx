import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import SettingsPage from "@/features/profile/pages/SettingsPage";
import Root from "@/app/container/Root";
import AuthRequired from "./AuthRequired";
import AuthPersist from "./AuthPersist";
import { LandingPage, NotFoundPage, TooManyRequestsPage } from "@/app/pages";
import { ChatDetailPage, MainChatPage, NewChatPage } from "@/features/chat/pages";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<AuthPersist />}>
        <Route index element={<LandingPage />} />
        <Route element={<AuthRequired />}>
          <Route path="/chat" element={<MainChatPage />} />
          <Route path="/chat/new" element={<NewChatPage />} />
          <Route path="/chat/:chatId" element={<MainChatPage />} />
          <Route path="/chat/:chatId/info" element={<ChatDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error/too-many-requests" element={<TooManyRequestsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
