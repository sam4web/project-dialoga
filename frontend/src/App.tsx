import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes";

const App = () => {
  return <RouterProvider router={AppRouter} />;
};

export default App;
