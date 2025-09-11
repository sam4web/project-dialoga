import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  // if not logged in redirect to login page

  return <Outlet />;
}

export default ProtectedRoutes;
