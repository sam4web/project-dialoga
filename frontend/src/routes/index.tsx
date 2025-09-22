import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import BaseLayout from "@/components/layouts/BaseLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import MainChatPage from "@/features/chat/pages/MainChatPage";
import NewChatContacts from "@/features/chat/pages/NewChatContacts";
import ChatDetailPage from "@/features/chat/pages/ChatDetailPage";
import SettingsPage from "@/features/profile/pages/SettingsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthPersist from "./AuthPersist";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route element={<AuthPersist />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chat" element={<MainChatPage />} />
          <Route path="/chat/new" element={<NewChatContacts />} />
          <Route path="/chat/:chatId" element={<MainChatPage />} />
          <Route path="/chat/:chatId/info" element={<ChatDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
