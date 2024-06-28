"use client";

import React, { memo } from "react";
import ThemePallets from "./ThemePallets";
type ThemeProps = {};

const Theme = (props: ThemeProps) => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-xl">Pick a theme</h1>
      <ThemePallets />
    </div>
  );
};

export default memo(Theme);
