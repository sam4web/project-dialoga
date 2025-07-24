import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="icon-colored" title="Go Back" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

export default BackButton;
