"use client";

import { Card } from "@/components/ui/card";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

function ThemePallets() {
  const { themeConfig, applyTheme } = useTheme();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      {themeConfig.map((theme, index) => (
        <Card
          onClick={() => applyTheme(theme._id)}
          key={index}
          className={cn(
            "hover:scale-105 shadow-lg shadow-main-bg",
            "transition-all duration-300",
            "pallet-card bg-main-fg p-6 rounded-lg",
            "cursor-pointer"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{theme.name}</h3>
          </div>
          <p className="text-muted-foreground mb-4">{theme.description}</p>
          <div className="flex gap-2 flex-wrap">
            {theme.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-10 h-10 shrink-0 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ThemePallets;

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
