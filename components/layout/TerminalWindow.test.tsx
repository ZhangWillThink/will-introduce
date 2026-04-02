import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { TerminalWindow } from "./TerminalWindow";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

describe("TerminalWindow", () => {
  test("暴露 theme scene 窗口表面钩子并正常渲染内容", () => {
    const { container } = render(
      <TerminalWindow title="Profile" filename="profile.tsx">
        <p>Vault-Tec Terminal Content</p>
      </TerminalWindow>,
    );

    const shell = container.firstElementChild;

    expect(shell).not.toBeNull();
    expect(shell?.getAttribute("data-theme-surface")).toBe("window");
    expect(shell?.classList.contains("theme-surface")).toBe(true);
    expect(shell?.classList.contains("theme-terminal-window")).toBe(true);
    expect(screen.getByText("Vault-Tec Terminal Content")).not.toBeNull();
  });
});
