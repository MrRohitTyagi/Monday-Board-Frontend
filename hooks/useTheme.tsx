"use client";
import { themeConfig } from "@/constants/theme";
import { useCallback } from "react";

const useTheme = () => {
  //
  const applyTheme = useCallback((_id: string) => {
    const root = document.documentElement;
    const [
      main_bg,
      main_fg,
      border_light,
      highlighter,
      highlight_dark,
      text_color,
    ] = themeConfig.find((t) => t._id === _id)?.colors || themeConfig[0].colors;

    localStorage.setItem("theme-preference", _id);

    root.style.setProperty("--main-bg", main_bg);
    root.style.setProperty("--main-fg", main_fg);
    root.style.setProperty("--border-light", border_light);
    root.style.setProperty("--highlighter", highlighter);
    root.style.setProperty("--highlighter-dark", highlight_dark);
    root.style.setProperty("--text-color", text_color);
  }, []);

  const getTheme = useCallback(() => {
    const localTHemePk = localStorage.getItem("theme-preference");

    return themeConfig.find((t) => t._id === localTHemePk) || themeConfig[0];
  }, []);
  return { themeConfig, applyTheme, getTheme };
};

export default useTheme;
