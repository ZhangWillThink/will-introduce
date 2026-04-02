"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { dispatchThemeSceneRequest } from "./theme-scene";

export function ThemeToggle() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark ? "切换到亮色主题" : "切换到暗色主题";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(event) => dispatchThemeSceneRequest("toggle", event.currentTarget)}
      className="theme-toggle relative size-9 overflow-hidden rounded-full border border-border/60 bg-background/70 text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.05)_inset] backdrop-blur-sm hover:bg-background/85 dark:border-white/12"
      data-theme-trigger="status-bar"
      data-theme-state={isDark ? "dark" : "light"}
      aria-label={ariaLabel}
    >
      <motion.div
        className="absolute inset-[5px] rounded-full border border-border/60"
        animate={{ rotate: isDark ? -180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-[7px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.72),transparent_42%),linear-gradient(135deg,rgba(250,204,21,0.32),rgba(59,130,246,0.16))] blur-[1px]"
        animate={{ opacity: isDark ? 0.75 : 1, scale: isDark ? 0.92 : 1.04 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <span className="sr-only">{ariaLabel}</span>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: isDark ? 22 : -18,
          scale: isDark ? 0.82 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.55 : 1, rotate: isDark ? 90 : 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <Sun className="size-4 text-amber-500" />
        </motion.div>

        <motion.div
          className="absolute"
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.55, rotate: isDark ? 0 : -90 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <Moon className="size-4 text-sky-200" />
        </motion.div>
      </motion.div>
    </Button>
  );
}
