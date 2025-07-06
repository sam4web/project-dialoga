import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "@/pages/Home";
import BaseLayout from "@/components/layouts/BaseLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  )
);

export default router;
