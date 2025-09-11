import { Moon, Sun } from "lucide-react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTheme, toggleTheme } from "@/features/theme/slice";

function ThemeToggler({ className }: { className?: string }) {
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button variant="icon" title="Toggle theme" onClick={handleToggle} className={className ? className : ""}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggler;
