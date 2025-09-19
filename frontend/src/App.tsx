import { RouterProvider } from "react-router-dom";
import AppRouter from "@/routes";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "@/features/theme/slice";
import Toast from "@/components/common/Toast";
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
      <Toast />
      <RouterProvider router={AppRouter} />
    </>
  );
};

export default App;
