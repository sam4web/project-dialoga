import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function BaseLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <main className="size-full min-h-screen">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default BaseLayout;
