import "./styles.css";
import Sun from "@mui/icons-material/LightMode";
import Moon from "@mui/icons-material/Brightness3";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const [isActive, setIsActive] = useState(false);
  const selectedTheme = localStorage.getItem("selectedTheme");

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const toggleTheme = () => {
    if (isActive) {
      setLightMode();
    } else {
      setDarkMode();
    }
    setIsActive(!isActive);
  };


  useEffect(() => {
    if (selectedTheme === "dark") {
      setIsActive(false);
      setDarkMode()
    } else {
      setIsActive(true);
    }
  }, [selectedTheme]);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={!isActive}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle" onClick={toggleTheme}>
        {isActive ? (
          <Sun sx={{ color: "#3b3b3b"  }} className="icon" />
        ) : (
          <Moon sx={{ color: "#ffffff" }} className="icon" />
        )}
      </label>
    </div>
  );
}
