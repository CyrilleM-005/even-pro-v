import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-base-300 transition-colors"
      aria-label="Basculer le thème"
    >
      {isDark ? (
        <Sun size={20} className="text-base-content" />
      ) : (
        <Moon size={20} className="text-base-content" />
      )}
    </button>
  );
};

export default ToggleTheme;
