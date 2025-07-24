import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="icon-colored" title="Go Back" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

function Header({ title }: Props) {
  return (
    <header className="border-b border-gray-400/30 shadow-xs">
      <div className="py-3 px-1 sm:px-7 flex items-center gap-3">
        <BackButton />
        <h3 className="font-semibold text-xl text-gray-700 dark:text-primary-light">{title}</h3>
      </div>
    </header>
  );
}

export default Header;
