import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
        </button>
    );
};

export default ThemeToggle;
