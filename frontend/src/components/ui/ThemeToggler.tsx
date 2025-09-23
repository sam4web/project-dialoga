import { Moon, Sun } from "lucide-react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTheme, toggleTheme } from "@/app/slices/themeSlice";

function ThemeToggler({ className }: { className?: string }) {
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  return (
    <Button
      variant="icon"
      title="Toggle theme"
      className={className ? className : ""}
      onClick={() => {
        dispatch(toggleTheme());
      }}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggler;
