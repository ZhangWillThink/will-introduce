import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ThemeToggle } from "./ThemeToggle";
import { dispatchThemeSceneRequest } from "./theme-scene";

const mockUseTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}));

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

    fireEvent.click(button);

    expect(dispatchThemeSceneRequest).toHaveBeenCalledTimes(1);
    expect(dispatchThemeSceneRequest).toHaveBeenCalledWith("toggle", button);
  });

  test("resolvedTheme 为 dark 时显示切换到亮色主题", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "dark",
    });

    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: "切换到亮色主题" }).getAttribute("data-theme-state")).toBe(
      "dark",
    );
  });
});
