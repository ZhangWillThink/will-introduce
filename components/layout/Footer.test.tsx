import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { Footer } from "./Footer";

vi.mock("framer-motion", () => ({
  motion: {
    footer: ({ children, ...props }: React.ComponentProps<"footer">) => (
      <footer {...props}>{children}</footer>
    ),
  },
}));

describe("Footer", () => {
  test("使用共享 frame 与低对比收尾文案", () => {
    const { container } = render(<Footer />);

    const footer = container.firstElementChild;

    expect(footer).not.toBeNull();
    expect(footer?.classList.contains("theme-footer")).toBe(true);
    expect(screen.getByText("Frontend")).not.toBeNull();
    expect(screen.getByText("AI")).not.toBeNull();
    expect(screen.getByText("Beijing")).not.toBeNull();
    expect(footer?.firstElementChild?.classList.contains("theme-frame")).toBe(true);
  });
});
