import { RouterProvider } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import AppRouter from "@/routes";

const App = () => {
  useTheme();

  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
};

export default App;
