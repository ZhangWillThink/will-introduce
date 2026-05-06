import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { StatusBar } from "./StatusBar";

vi.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: React.ComponentProps<"header">) => (
      <header {...props}>{children}</header>
    ),
  },
}));

vi.mock("@/components/theme/ThemeToggle", () => ({
  ThemeToggle: () => <button type="button">切换主题</button>,
}));

vi.mock("lucide-react", () => ({
  Mail: (props: React.ComponentProps<"svg">) => <svg {...props} />,
}));

vi.mock("react-icons/fa6", () => ({
  FaGithub: (props: React.ComponentProps<"svg">) => <svg {...props} />,
}));

describe("StatusBar", () => {
  test("渲染极简导航文案与联系方式结构", () => {
    render(<StatusBar />);

    expect(screen.getByText("张卫钰 Will Zhang / Portfolio")).not.toBeNull();
    expect(screen.getByText("Senior Full-stack Engineer")).not.toBeNull();
    expect(screen.queryByText("Available for opportunities")).toBeNull();

    const nav = screen.getByRole("navigation", { name: "联系方式" });

    expect(within(nav).getByRole("link", { name: "GitHub" })).not.toBeNull();
    expect(within(nav).getByRole("link", { name: "Email" })).not.toBeNull();
  });
});
