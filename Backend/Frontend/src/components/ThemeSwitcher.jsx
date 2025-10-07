import React, { useEffect, useState, useRef } from "react";
import { FaPalette } from "react-icons/fa";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter"
];


const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="btn btn-ghost text-2xl"
        aria-label="Choose theme"
        onClick={() => setOpen((v) => !v)}
      >
        <FaPalette />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 z-50 bg-base-200 shadow-lg rounded-box p-2 w-56 max-h-96 overflow-y-auto border border-base-300">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full hover:bg-base-300 ${theme === t ? "ring-2 ring-primary" : ""}`}
                style={{ transition: "background 0.2s" }}
                onClick={() => { setTheme(t); setOpen(false); }}
              >
                <span className="w-6 h-6 rounded bg-base-100 border border-base-300 flex items-center justify-center" style={{ background: `hsl(var(--b1))` }} data-theme={t}></span>
                <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
