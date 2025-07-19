import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button varient="icon" title="Go Back" className="hover:[&>svg]:text-primary" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

function Header({ title }: Props) {
  return (
    <header>
      <BackButton />
    </header>
  );
}

export default Header;
