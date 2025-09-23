import ErrorView from "@/components/container/ErrorView";
import { HTTP_STATUS } from "@shared/constants";

function NotFoundPage() {
  return (
    <ErrorView
      status={HTTP_STATUS.NOT_FOUND}
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      showHomeLink
    />
  );
}

export default NotFoundPage;
