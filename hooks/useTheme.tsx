"use client";
import { pulseHeightConfig, themeConfig } from "@/constants/theme";
import { useConfig } from "@/store/configStore";
import { PulseHeightType } from "@/types/configTypes";
import { useCallback } from "react";

const useTheme = () => {
  const { pulseHeight: configPulseHeight, themeID: configThemeID } =
    useConfig();
  //
  const applyTheme = useCallback(() => {
    const localPulseHeight = localStorage.getItem("pulse-height");
    const localTHemePk = localStorage.getItem("theme-preference") || "";

    const root = document.documentElement;
    const [
      main_bg,
      main_fg,
      border_light,
      highlighter,
      highlight_dark,
      text_color,
    ] =
      themeConfig.find((t) => t._id === localTHemePk)?.colors ||
      themeConfig[0].colors;

    const pulseHeight =
      (localPulseHeight as PulseHeightType) || configPulseHeight || "sm";

    localStorage.setItem("theme-preference", localTHemePk);
    localStorage.setItem("pulse-height", pulseHeight);

    root.style.setProperty("--main-bg", main_bg);
    root.style.setProperty("--main-fg", main_fg);
    root.style.setProperty("--border-light", border_light);
    root.style.setProperty("--highlighter", highlighter);
    root.style.setProperty("--highlighter-dark", highlight_dark);
    root.style.setProperty("--text-color", text_color);
    //
    root.style.setProperty(
      "--pulse-height",
      pulseHeightConfig[pulseHeight] as PulseHeightType
    );
  }, [configThemeID, configPulseHeight]);

  const applyPulseHeight = useCallback((h: PulseHeightType) => {
    const root = document.documentElement;
    localStorage.setItem("pulse-height", h);
    root.style.setProperty(
      "--pulse-height",
      pulseHeightConfig[h] as PulseHeightType
    );
  }, []);

  return { themeConfig, applyTheme, applyPulseHeight };
};

export default useTheme;
