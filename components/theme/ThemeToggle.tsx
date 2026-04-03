"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { dispatchThemeSceneRequest } from "./theme-scene";

export function ThemeToggle() {
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark ? "切换到亮色主题" : "切换到暗色主题";
  const iconWrapperAnimation = shouldReduceMotion
    ? undefined
    : {
        rotate: isDark ? 12 : -10,
        scale: isDark ? 0.88 : 1,
      };
  const iconStateTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: "easeInOut" as const };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      onClick={(event) => dispatchThemeSceneRequest("toggle", event.currentTarget)}
      className="theme-toggle relative overflow-hidden rounded-[2px] border border-border/60 bg-background/72 text-foreground shadow-none backdrop-blur-sm hover:bg-background/84 dark:border-white/12"
      data-theme-trigger="status-bar"
      data-theme-state={isDark ? "dark" : "light"}
      aria-label={ariaLabel}
    >
      <motion.div
        className="absolute inset-[4px] rounded-[2px] border border-border/60"
        animate={shouldReduceMotion ? undefined : { rotate: isDark ? -180 : 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeInOut" as const }}
      />

      <motion.div
        className="absolute inset-[6px] rounded-[1px] bg-[linear-gradient(135deg,rgba(250,204,21,0.14),rgba(59,130,246,0.08))]"
        animate={shouldReduceMotion ? { opacity: isDark ? 0.6 : 0.82 } : { opacity: isDark ? 0.6 : 0.82, scale: isDark ? 0.96 : 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" as const }}
      >
        <span className="sr-only">{ariaLabel}</span>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={iconWrapperAnimation}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeInOut" as const }}
      >
        <motion.div
          className="absolute"
          animate={
            shouldReduceMotion
              ? { opacity: isDark ? 0 : 1 }
              : { opacity: isDark ? 0 : 1, scale: isDark ? 0.55 : 1, rotate: isDark ? 90 : 0 }
          }
          transition={iconStateTransition}
        >
          <Sun aria-hidden="true" data-testid="theme-toggle-sun-icon" className="size-[0.9rem] text-amber-500/90" strokeWidth={1.8} />
        </motion.div>

        <motion.div
          className="absolute"
          animate={
            shouldReduceMotion
              ? { opacity: isDark ? 1 : 0 }
              : { opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.55, rotate: isDark ? 0 : -90 }
          }
          transition={iconStateTransition}
        >
          <Moon aria-hidden="true" data-testid="theme-toggle-moon-icon" className="size-[0.9rem] text-sky-200/90" strokeWidth={1.8} />
        </motion.div>
      </motion.div>
    </Button>
  );
}
