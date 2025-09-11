import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import BaseLayout from "@/components/layouts/BaseLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import MainChatPage from "@/features/chat/pages/MainChatPage";
import NewChatPage from "@/features/chat/pages/NewChatPage";
import ChatInfoPage from "@/features/chat/pages/ChatInfoPage";
import SettingsPage from "@/features/profile/pages/SettingsPage";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chat" element={<MainChatPage />} />
          <Route path="/chat/new" element={<NewChatPage />} />
          <Route path="/chat/:chatId" element={<MainChatPage />} />
          <Route path="/chat/:chatId/info" element={<ChatInfoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
