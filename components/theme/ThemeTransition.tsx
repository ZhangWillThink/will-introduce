"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

const enterEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.7, 0, 0.84, 0] as const;

export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const previousThemeRef = useRef<string | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (previousThemeRef.current !== undefined && previousThemeRef.current !== theme) {
      setIsTransitioning(true);

      const timer = window.setTimeout(
        () => {
          setIsTransitioning(false);
        },
        shouldReduceMotion ? 220 : 520,
      );

      previousThemeRef.current = theme;

      return () => window.clearTimeout(timer);
    }

    previousThemeRef.current = theme;
  }, [shouldReduceMotion, theme]);

  const isDark = resolvedTheme === "dark";
  const palette = isDark
    ? {
        ambient:
          "radial-gradient(120% 90% at 84% 10%, rgba(96, 165, 250, 0.12) 0%, rgba(129, 140, 248, 0.08) 28%, transparent 58%), radial-gradient(100% 72% at 56% -8%, rgba(192, 132, 252, 0.06) 0%, transparent 62%), linear-gradient(180deg, rgba(2, 6, 23, 0.18) 0%, rgba(15, 23, 42, 0.05) 40%, rgba(15, 23, 42, 0.1) 100%)",
        gradientField:
          "radial-gradient(ellipse at center, rgba(219, 234, 254, 0.16) 0%, rgba(96, 165, 250, 0.12) 32%, rgba(129, 140, 248, 0.08) 58%, transparent 82%)",
        pearl:
          "radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(191, 219, 254, 0.12) 28%, rgba(129, 140, 248, 0.08) 48%, transparent 74%)",
        gradientOpacity: shouldReduceMotion ? 0.08 : 0.16,
        pearlOpacity: shouldReduceMotion ? 0.08 : 0.14,
      }
    : {
        ambient:
          "radial-gradient(120% 90% at 84% 10%, rgba(251, 191, 36, 0.08) 0%, rgba(251, 146, 60, 0.06) 24%, transparent 56%), radial-gradient(96% 68% at 60% -8%, rgba(244, 114, 182, 0.05) 0%, transparent 60%), linear-gradient(180deg, rgba(255, 251, 245, 0.34) 0%, rgba(255, 247, 237, 0.08) 40%, rgba(255, 243, 232, 0.14) 100%)",
        gradientField:
          "radial-gradient(ellipse at center, rgba(255, 248, 235, 0.24) 0%, rgba(253, 224, 160, 0.14) 34%, rgba(251, 191, 36, 0.08) 58%, transparent 82%)",
        pearl:
          "radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, rgba(255, 237, 213, 0.14) 30%, rgba(251, 191, 36, 0.08) 48%, transparent 74%)",
        gradientOpacity: shouldReduceMotion ? 0.1 : 0.18,
        pearlOpacity: shouldReduceMotion ? 0.08 : 0.14,
      };

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: shouldReduceMotion ? 0.14 : 0.22,
              ease: enterEase,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0.12 : 0.18,
              ease: exitEase,
            },
          }}
          className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: shouldReduceMotion ? 0.18 : 0.32,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.24,
                ease: exitEase,
              },
            }}
            className="absolute inset-0"
            style={{ background: palette.ambient }}
          />

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 8,
              y: shouldReduceMotion ? 0 : -8,
              scale: shouldReduceMotion ? 1 : 0.96,
            }}
            animate={{
              opacity: palette.gradientOpacity,
              x: 0,
              y: 0,
              scale: shouldReduceMotion ? 1 : 1.02,
              transition: {
                duration: shouldReduceMotion ? 0.18 : 0.46,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -8,
              y: shouldReduceMotion ? 0 : 10,
              scale: shouldReduceMotion ? 1 : 1.04,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.24,
                ease: exitEase,
              },
            }}
            className="absolute -top-20 right-[-8vw] h-112 w-[64vw] max-w-3xl blur-3xl sm:h-128"
            style={{ background: palette.gradientField }}
          />

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 6,
              y: shouldReduceMotion ? 0 : -6,
              scale: shouldReduceMotion ? 1 : 0.9,
            }}
            animate={{
              opacity: palette.pearlOpacity,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.18 : 0.38,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -6,
              y: shouldReduceMotion ? 0 : 8,
              scale: shouldReduceMotion ? 1 : 1.02,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.22,
                ease: exitEase,
              },
            }}
            className="absolute -top-8 -right-6 h-40 w-40 rounded-full blur-2xl sm:h-48 sm:w-48"
            style={{ background: palette.pearl }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
