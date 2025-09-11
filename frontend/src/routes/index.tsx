import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import BaseLayout from "@/components/layouts/BaseLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import MainChatPage from "@/features/chat/pages/MainChatPage";
import NewChatPage from "@/features/chat/pages/NewChatPage";
import ChatInfoPage from "@/features/chat/pages/ChatInfoPage";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<MainChatPage />} />
        <Route path="/chat/new" element={<NewChatPage />} />
        <Route path="/chat/:chatId/info" element={<ChatInfoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
