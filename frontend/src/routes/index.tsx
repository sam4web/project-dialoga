import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import MainChatPage from "@/features/chat/pages/MainChatPage";
import NewChatContacts from "@/features/chat/pages/NewChatContacts";
import ChatDetailPage from "@/features/chat/pages/ChatDetailPage";
import SettingsPage from "@/features/profile/pages/SettingsPage";
import AuthPersist from "./AuthPersist";
import Root from "@/app/container/Root";
import { NotFoundPage, TooManyRequestsPage } from "@/pages";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<AuthPersist />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<MainChatPage />} />
        <Route path="/chat/new" element={<NewChatContacts />} />
        <Route path="/chat/:chatId" element={<MainChatPage />} />
        <Route path="/chat/:chatId/info" element={<ChatDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error/too-many-requests" element={<TooManyRequestsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
