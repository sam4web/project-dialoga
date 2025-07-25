import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import BaseLayout from "@/components/layouts/BaseLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import NewChatPage from "@/features/chat/pages/NewChatPage";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/new-chat" element={<NewChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
