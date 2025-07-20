import { Moon, Sun } from "lucide-react";
import Button from "./Button";
import useTheme from "@/hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button varient="icon" title="Toggle Theme" onClick={() => toggleTheme()}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggle;
