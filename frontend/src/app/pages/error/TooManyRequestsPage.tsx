import { selectIsTooManyRequests } from "@/app/slices";
import { ErrorView } from "@/components";
import { HTTP_STATUS } from "@shared/constants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function TooManyRequestsPage() {
  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  if (!isTooManyRequests) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <ErrorView
      status={HTTP_STATUS.TOO_MANY_REQUESTS}
      title="Too Many Requests"
      description="Too many requests from this IP, please try again later"
    />
  );
}

export default TooManyRequestsPage;
