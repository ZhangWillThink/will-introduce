import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { TerminalWindow } from "./TerminalWindow";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

describe("TerminalWindow", () => {
  test("暴露轻量 shell 结构并保留主题表面钩子", () => {
    const { container } = render(
      <TerminalWindow title="Profile" filename="profile.tsx">
        <p>Vault-Tec Terminal Content</p>
      </TerminalWindow>,
    );

    const shell = container.firstElementChild;

    expect(shell).not.toBeNull();
    expect(shell?.getAttribute("data-theme-surface")).toBe("window");
    expect(shell?.classList.contains("theme-surface")).toBe(true);
    expect(screen.getByText("profile.tsx")).not.toBeNull();
    expect(screen.getByText("Profile")).not.toBeNull();
    expect(screen.queryByLabelText("Close")).toBeNull();
    expect(screen.queryByLabelText("Minimize")).toBeNull();
    expect(screen.queryByLabelText("Maximize")).toBeNull();
    expect(screen.getByText("Vault-Tec Terminal Content")).not.toBeNull();
  });
});
