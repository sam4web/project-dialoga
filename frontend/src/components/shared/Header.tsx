import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "../ui/ThemeToggler";

type Props = {
  title: string;
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button varient="icon" title="Go Back" className="hover:[&>svg]:!text-primary" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

function Header({ title }: Props) {
  return (
    <header className="border-b border-gray-400/30 shadow-sm">
      <div className="flex-between py-3 px-7 ">
        <div className="flex-center gap-2">
          <BackButton />
          <h3 className="font-semibold text-xl text-gray-700 dark:text-primary-light">{title}</h3>
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
