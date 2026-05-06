import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { HeroTerminal } from "./HeroTerminal";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<"h1">) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.ComponentProps<"p">) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
  },
}));

describe("HeroTerminal", () => {
  test("首屏仅从 site-content 拉取叙事并通过锚点引向联系与项目", () => {
    const { container } = render(<HeroTerminal />);

    const emailLink = screen.getByRole("link", { name: "发邮件" });
    const contactLink = screen.getByRole("link", { name: "联系方式" });
    const projectsLink = screen.getByRole("link", { name: "项目" });

    expect(screen.getByRole("heading", { name: "张卫钰 Will Zhang" })).not.toBeNull();
    expect(screen.getByText("Beijing Chaoyang / Available now")).not.toBeNull();
    expect(screen.getByText("高级全栈工程师", { exact: false })).not.toBeNull();

    expect(emailLink.getAttribute("href")).toBe("mailto:zwillthink@163.com");
    expect(contactLink.getAttribute("href")).toBe("#contact");
    expect(projectsLink.getAttribute("href")).toBe("#projects");

    expect(screen.queryByText("Architecture")).toBeNull();
    expect(screen.queryByText("$ cat will_zhang.txt")).toBeNull();
    expect(container.textContent).not.toContain("$ cat will_zhang.txt");
  });
});
