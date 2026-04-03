import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { HeroTerminal } from "./HeroTerminal";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<"h1">) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.ComponentProps<"p">) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: React.ComponentProps<"ul">) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: React.ComponentProps<"li">) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
  },
}));

describe("HeroTerminal", () => {
  test("渲染主叙事面板内容并移除旧终端命令", () => {
    const { container } = render(<HeroTerminal />);

    const emailLink = screen.getByRole("link", { name: "发邮件" });
    const githubLink = screen.getByRole("link", { name: "GitHub" });

    expect(screen.getByRole("heading", { name: "Will Zhang" })).not.toBeNull();
    expect(screen.getByText("Based in Beijing / Selectively available")).not.toBeNull();
    expect(
      screen.getByText("具备全栈延展能力的前端工程师，专注交互动效、AI 功能与工程质量。"),
    ).not.toBeNull();
    expect(screen.getByText("Interaction")).not.toBeNull();
    expect(screen.getByText("AI")).not.toBeNull();
    expect(screen.getByText("Quality")).not.toBeNull();
    expect(emailLink.getAttribute("href")).toBe("mailto:zwillthink@outlook.com");
    expect(githubLink.getAttribute("href")).toBe("https://github.com/ZhangWillThink");
    expect(screen.queryByText("$ cat will_zhang.txt")).toBeNull();
    expect(screen.queryByText(/\$\s*_/)).toBeNull();
    expect(screen.queryByText("> FRONTEND ENGINEER")).toBeNull();
    expect(container.textContent).not.toContain("$ cat will_zhang.txt");
  });
});
