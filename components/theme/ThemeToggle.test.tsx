import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ThemeToggle } from "./ThemeToggle";
import { dispatchThemeSceneRequest } from "./theme-scene";

const mockUseTheme = vi.fn();
const mockUseReducedMotion = vi.fn();
const motionDivCalls: Array<{ animate?: unknown; transition?: unknown }> = [];

vi.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");

  return {
    ...actual,
    useReducedMotion: () => mockUseReducedMotion(),
    motion: {
      div: ({ children, ...props }: React.ComponentProps<"div">) => {
        motionDivCalls.push({
          animate: (props as { animate?: unknown }).animate,
          transition: (props as { transition?: unknown }).transition,
        });
        return <div {...props}>{children}</div>;
      },
    },
  };
});

vi.mock("./theme-scene", async () => {
  const actual = await vi.importActual<typeof import("./theme-scene")>("./theme-scene");

  return {
    ...actual,
    dispatchThemeSceneRequest: vi.fn(),
  };
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockUseTheme.mockReset();
    mockUseReducedMotion.mockReset();
    mockUseReducedMotion.mockReturnValue(false);
    motionDivCalls.length = 0;
    vi.mocked(dispatchThemeSceneRequest).mockReset();
  });

  test("resolvedTheme 为 light 时显示切换到暗色主题并从状态栏按钮发起场景请求", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "light",
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "切换到暗色主题" });

    expect(button.getAttribute("data-theme-trigger")).toBe("status-bar");
    expect(button.getAttribute("data-theme-state")).toBe("light");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.className).not.toContain("rounded-full");

    fireEvent.click(button);

    expect(dispatchThemeSceneRequest).toHaveBeenCalledTimes(1);
    expect(dispatchThemeSceneRequest).toHaveBeenCalledWith("toggle", button);
  });

  test("resolvedTheme 为 dark 时显示切换到亮色主题", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "dark",
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "切换到亮色主题" });

    expect(button.getAttribute("data-theme-state")).toBe("dark");
    expect(screen.getByTestId("theme-toggle-sun-icon").getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByTestId("theme-toggle-moon-icon").getAttribute("aria-hidden")).toBe("true");
  });

  test("保留至少 36px 的可点击尺寸，不因视觉收紧而缩小交互目标", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "light",
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "切换到暗色主题" });

    expect(button.getAttribute("data-size")).toBe("icon-lg");
    expect(button.className).toContain("size-10");
  });

  test("reduced motion 时不再为图标层传入旋转和缩放动画", () => {
    mockUseReducedMotion.mockReturnValue(true);
    mockUseTheme.mockReturnValue({
      resolvedTheme: "dark",
    });

    render(<ThemeToggle />);

    const animatedPayloads = motionDivCalls
      .map((props) => props.animate)
      .filter((value) => value && typeof value === "object");

    expect(
      animatedPayloads.some((value) => {
        const animation = value as Record<string, unknown>;
        return "rotate" in animation || "scale" in animation;
      }),
    ).toBe(false);

    const transitions = motionDivCalls.map((props) => props.transition).filter(Boolean);
    expect(
      transitions.every((transition) =>
        transition && typeof transition === "object" && "duration" in transition
          ? (transition as { duration?: number }).duration === 0
          : true,
      ),
    ).toBe(true);
  });
});
