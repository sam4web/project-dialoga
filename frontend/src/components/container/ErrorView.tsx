import { Button } from "@/components";
import { useTitle } from "@/hooks";
import { Link } from "react-router-dom";

interface Props {
  status: number;
  title: string;
  description?: string;
  showHomeLink?: boolean;
}

function ErrorView({ status, title, description, showHomeLink = false }: Props) {
  useTitle({ title: title, template: true });

  return (
    <div className="container flex-center mx-auto">
      <div className="container-card max-w-md sm:max-w-lg w-full text-center py-10 sm:py-14">
        <div className="space-y-3.5 mb-4 sm:mb-6">
          <div className="space-y-2">
            <h3 className="text-primary font-semibold text-6xl">{status}</h3>
            <p className="text-color-primary font-medium text-xl sm:text-2xl">{title}</p>
          </div>
          {description && <p className="text-color-light max-w-sm mx-auto">{description}</p>}
        </div>
        {showHomeLink && (
          <Link to={"/"}>
            <Button variant="primary">Return to Home</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ErrorView;
