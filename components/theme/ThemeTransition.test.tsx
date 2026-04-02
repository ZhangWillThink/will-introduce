import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ThemeTransition } from "./ThemeTransition";
import { THEME_SCENE_REQUEST_EVENT, type ThemeSceneRequestDetail } from "./theme-scene";

const mockUseTheme = vi.fn();
const mockUseReducedMotion = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("ThemeTransition", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseTheme.mockReset();
    mockUseReducedMotion.mockReset();
    mockUseReducedMotion.mockReturnValue(false);
  });

  test("响应 theme scene 请求并同步文档阶段、变量和目标主题", () => {
    const setTheme = vi.fn();

    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme,
    });

    render(<ThemeTransition />);

    const detail: ThemeSceneRequestDetail = {
      request: "toggle",
      origin: {
        originX: 120,
        originY: 48,
        originRadius: 20,
      },
    };

    act(() => {
      window.dispatchEvent(new CustomEvent(THEME_SCENE_REQUEST_EVENT, { detail }));
    });

    expect(setTheme).toHaveBeenCalledWith("dark");
    expect(document.documentElement.dataset.themeScene).toBe("preparing");
    expect(document.documentElement.dataset.themeSceneTo).toBe("dark");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-x")).toBe("120px");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-y")).toBe("48px");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-radius")).toBe("20px");
    expect(screen.queryByTestId("theme-transition-overlay")).not.toBeNull();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(document.documentElement.dataset.themeScene).toBe("sweeping");

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(document.documentElement.dataset.themeScene).toBe("settling");

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(document.documentElement.dataset.themeScene).toBeUndefined();
    expect(document.documentElement.dataset.themeSceneTo).toBeUndefined();
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-x")).toBe("");
  });

  test("request 为 system 时使用 next-themes 提供的 systemTheme 作为视觉目标", () => {
    const setTheme = vi.fn();

    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      systemTheme: "dark",
      setTheme,
    });

    render(<ThemeTransition />);

    const detail: ThemeSceneRequestDetail = {
      request: "system",
      origin: {
        originX: 80,
        originY: 20,
        originRadius: 12,
      },
    };

    act(() => {
      window.dispatchEvent(new CustomEvent(THEME_SCENE_REQUEST_EVENT, { detail }));
    });

    expect(setTheme).toHaveBeenCalledWith("system");
    expect(document.documentElement.dataset.themeSceneTo).toBe("dark");
  });

  test("连续两次 toggle 时第二次基于最新目标主题反向切回", () => {
    const setTheme = vi.fn();

    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      systemTheme: "light",
      setTheme,
    });

    render(<ThemeTransition />);

    const firstDetail: ThemeSceneRequestDetail = {
      request: "toggle",
      origin: {
        originX: 120,
        originY: 48,
        originRadius: 20,
      },
    };

    const secondDetail: ThemeSceneRequestDetail = {
      request: "toggle",
      origin: {
        originX: 32,
        originY: 18,
        originRadius: 8,
      },
    };

    act(() => {
      window.dispatchEvent(new CustomEvent(THEME_SCENE_REQUEST_EVENT, { detail: firstDetail }));
      window.dispatchEvent(new CustomEvent(THEME_SCENE_REQUEST_EVENT, { detail: secondDetail }));
    });

    expect(setTheme).toHaveBeenNthCalledWith(1, "dark");
    expect(setTheme).toHaveBeenNthCalledWith(2, "light");
    expect(document.documentElement.dataset.themeSceneTo).toBe("light");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-x")).toBe("32px");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-y")).toBe("18px");
  });

  test("新请求会中断旧阶段推进并从新的 preparing 开始", () => {
    const setTheme = vi.fn();

    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      systemTheme: "light",
      setTheme,
    });

    render(<ThemeTransition />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent(THEME_SCENE_REQUEST_EVENT, {
          detail: {
            request: "toggle",
            origin: {
              originX: 120,
              originY: 48,
              originRadius: 20,
            },
          } satisfies ThemeSceneRequestDetail,
        }),
      );
    });

    act(() => {
      vi.advanceTimersByTime(80);
    });

    expect(document.documentElement.dataset.themeScene).toBe("preparing");

    act(() => {
      window.dispatchEvent(
        new CustomEvent(THEME_SCENE_REQUEST_EVENT, {
          detail: {
            request: "toggle",
            origin: {
              originX: 12,
              originY: 16,
              originRadius: 6,
            },
          } satisfies ThemeSceneRequestDetail,
        }),
      );
    });

    expect(document.documentElement.dataset.themeScene).toBe("preparing");
    expect(document.documentElement.style.getPropertyValue("--theme-scene-origin-x")).toBe("12px");

    act(() => {
      vi.advanceTimersByTime(81);
    });

    expect(document.documentElement.dataset.themeScene).toBe("preparing");

    act(() => {
      vi.advanceTimersByTime(79);
    });

    expect(document.documentElement.dataset.themeScene).toBe("sweeping");
  });
});
