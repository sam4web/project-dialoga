import { RouterProvider } from "react-router-dom";
import AppRouter from "@/routes";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "./features/theme/slice";
import { useEffect } from "react";

const App = () => {
  const currentTheme = useSelector(selectCurrentTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
};

export default App;
