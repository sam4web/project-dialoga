import Button from "@/components/ui/Button";
import useTitle from "@/hooks/useTitle";
import { Link } from "react-router-dom";

function NotFoundPage() {
  useTitle({ title: "Page Not Found" });

  return (
    <div className="container flex-center mx-auto">
      <div className="container-card max-w-md sm:max-w-lg w-full text-center py-10 sm:py-14">
        <div className="space-y-3.5 mb-4 sm:mb-6">
          <div className="space-y-2">
            <h3 className="text-primary font-semibold text-6xl">404</h3>
            <p className="text-color-primary font-medium text-xl sm:text-2xl">Page Not Found</p>
          </div>
          <p className="text-color-light max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to={"/"}>
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
