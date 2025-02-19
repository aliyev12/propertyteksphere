import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return theme === "light" ? (
    <Button onClick={() => setTheme("dark")}>
      <Moon />
    </Button>
  ) : (
    <Button onClick={() => setTheme("light")}>
      <Sun />
    </Button>
  );
};

export default ThemeChanger;
