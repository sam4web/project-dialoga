import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="icon" title="Go Back" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

function Header({ title }: Props) {
  return (
    <header className="border-b border-zinc-400/50 dark:border-zinc-700 shadow-xs">
      <div className="py-3 md:py-3.5 px-3 md:px-7 flex items-center space-x-1 md:space-x-3">
        <BackButton />
        <h3 className="font-medium text-xl md:text-2xl text-gray-700 dark:text-primary-light">{title}</h3>
      </div>
    </header>
  );
}

export default Header;
