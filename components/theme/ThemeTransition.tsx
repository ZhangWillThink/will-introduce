"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  THEME_SCENE_REQUEST_EVENT,
  resolveThemeSceneTarget,
  type ResolvedTheme,
  type ThemeChoice,
  type ThemeSceneRequestDetail,
} from "./theme-scene";

type ThemeScenePhase = "preparing" | "sweeping" | "settling";

type ActiveScene = {
  phase: ThemeScenePhase;
  toTheme: ThemeChoice;
  originX: number;
  originY: number;
  originRadius: number;
};

const PHASE_SEQUENCE: ThemeScenePhase[] = ["preparing", "sweeping", "settling"];

export function ThemeTransition() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState<ActiveScene | null>(null);
  const timerRef = useRef<number | null>(null);
  const latestVisualThemeRef = useRef<ResolvedTheme>((resolvedTheme ?? "light") as ResolvedTheme);
  const latestSystemThemeRef = useRef<ResolvedTheme>((systemTheme ?? resolvedTheme ?? "light") as ResolvedTheme);

  useEffect(() => {
    latestVisualThemeRef.current = (resolvedTheme ?? "light") as ResolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    latestSystemThemeRef.current = (systemTheme ?? resolvedTheme ?? "light") as ResolvedTheme;
  }, [resolvedTheme, systemTheme]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!activeScene) {
      delete root.dataset.themeScene;
      delete root.dataset.themeSceneTo;
      root.style.removeProperty("--theme-scene-origin-x");
      root.style.removeProperty("--theme-scene-origin-y");
      root.style.removeProperty("--theme-scene-origin-radius");
      return;
    }

    root.dataset.themeScene = activeScene.phase;
    root.dataset.themeSceneTo = activeScene.toTheme;
    root.style.setProperty("--theme-scene-origin-x", `${activeScene.originX}px`);
    root.style.setProperty("--theme-scene-origin-y", `${activeScene.originY}px`);
    root.style.setProperty("--theme-scene-origin-radius", `${activeScene.originRadius}px`);
  }, [activeScene]);

  useEffect(() => {
    const advanceScene = (index: number, scene: Omit<ActiveScene, "phase">) => {
      if (index >= PHASE_SEQUENCE.length) {
        setActiveScene(null);
        timerRef.current = null;
        return;
      }

      setActiveScene({ phase: PHASE_SEQUENCE[index], ...scene });
      timerRef.current = window.setTimeout(
        () => advanceScene(index + 1, scene),
        shouldReduceMotion ? 80 : 160,
      );
    };

    const handleThemeSceneRequest = (event: Event) => {
      const detail = (event as CustomEvent<ThemeSceneRequestDetail>).detail;

      if (!detail) {
        return;
      }

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      const target = resolveThemeSceneTarget({
        currentResolvedTheme: latestVisualThemeRef.current,
        request: detail.request,
        systemResolvedTheme: latestSystemThemeRef.current,
      });

      latestVisualThemeRef.current = target.visualTheme;
      latestSystemThemeRef.current =
        detail.request === "system" ? target.visualTheme : latestSystemThemeRef.current;

      setTheme(target.persistedTheme);

      advanceScene(0, {
        toTheme: target.visualTheme,
        originX: detail.origin.originX,
        originY: detail.origin.originY,
        originRadius: detail.origin.originRadius,
      });
    };

    window.addEventListener(THEME_SCENE_REQUEST_EVENT, handleThemeSceneRequest);

    return () => {
      window.removeEventListener(THEME_SCENE_REQUEST_EVENT, handleThemeSceneRequest);

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [setTheme, shouldReduceMotion]);

  if (!activeScene) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-testid="theme-transition-overlay"
      className="theme-transition-overlay"
    >
      <div className="theme-transition-sweep" />
    </div>
  );
}
