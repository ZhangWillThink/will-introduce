import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { CommandBar } from "./CommandBar";
import { dispatchThemeSceneRequest } from "@/components/theme/theme-scene";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/components/theme/theme-scene", async () => {
  const actual = await vi.importActual<typeof import("@/components/theme/theme-scene")>(
    "@/components/theme/theme-scene",
  );

  return {
    ...actual,
    dispatchThemeSceneRequest: vi.fn(),
  };
});

describe("CommandBar", () => {
  beforeEach(() => {
    vi.mocked(dispatchThemeSceneRequest).mockReset();
    localStorage.clear();
  });

  test("theme dark 回车后走统一主题场景请求并显示成功消息", async () => {
    const user = userEvent.setup();

    render(<CommandBar />);

    fireEvent.keyDown(document, { key: "/" });

    const input = await screen.findByPlaceholderText("输入命令...");

    await user.type(input, "theme dark{enter}");

    await waitFor(() => {
      expect(dispatchThemeSceneRequest).toHaveBeenCalledWith("dark");
    });

    expect(screen.getByText("主题切换：dark")).not.toBeNull();
  });

  test("theme sunrise 回车后显示未知主题且不发起场景请求", async () => {
    const user = userEvent.setup();

    render(<CommandBar />);

    fireEvent.keyDown(document, { key: "/" });

    const input = await screen.findByPlaceholderText("输入命令...");

    await user.type(input, "theme sunrise{enter}");

    expect(dispatchThemeSceneRequest).not.toHaveBeenCalled();
    expect(screen.getByText(/未知主题：sunrise/)).not.toBeNull();
  });
});
