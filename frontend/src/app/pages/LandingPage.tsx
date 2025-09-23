import { Button } from "@/components";
import { isUserAuthenticated } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

function LandingPage() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={"/chat"} replace />;
  }

  return (
    <div className="container flex-center mx-auto">
      <div className="container-card max-w-md sm:max-w-lg w-full text-center py-10 sm:py-14">
        <div className="space-y-3.5 mb-4 sm:mb-6">
          <div className="space-y-2">
            <p className="text-color-light max-w-sm mx-auto text-4xl">Welcome to Dialoga</p>
          </div>
        </div>
        <Link to={"/chat"}>
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
