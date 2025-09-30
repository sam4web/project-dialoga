import { useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { selectCurrentTheme } from "@/app/slices/themeSlice";

function Toast() {
  const theme = useSelector(selectCurrentTheme);
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={4}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      transition={Bounce}
      aria-label={"Application Notifications"}
    />
  );
}

export default Toast;
