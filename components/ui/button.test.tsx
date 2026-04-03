import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Button } from "./button";

function getClassTokens(element: HTMLElement) {
  return new Set(element.className.split(/\s+/).filter(Boolean));
}

describe("Button", () => {
  test("默认按钮使用 rounded-[2px] 且不再包含 rounded-md", () => {
    render(<Button>Launch</Button>);

    const button = screen.getByRole("button", { name: "Launch" });
    const classTokens = getClassTokens(button);

    expect(classTokens.has("rounded-[2px]")).toBe(true);
    expect(classTokens.has("rounded-md")).toBe(false);
  });

  test("icon 按钮使用 rounded-[2px] 且不再包含 rounded-md", () => {
    render(
      <Button size="icon" aria-label="Open panel">
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="M2 8h12" />
        </svg>
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Open panel" });
    const classTokens = getClassTokens(button);

    expect(classTokens.has("rounded-[2px]")).toBe(true);
    expect(classTokens.has("rounded-md")).toBe(false);
  });

  test("outline 变体保留清晰边框语义", () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole("button", { name: "Outline" });
    const classTokens = getClassTokens(button);

    expect(button.getAttribute("data-variant")).toBe("outline");
    expect(classTokens.has("border")).toBe(true);
    expect(classTokens.has("border-border")).toBe(true);
    expect(classTokens.has("bg-background")).toBe(true);
    expect(classTokens.has("text-foreground")).toBe(true);
  });

  test("ghost 变体保留克制的前景与 hover 语义", () => {
    render(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole("button", { name: "Ghost" });
    const classTokens = getClassTokens(button);

    expect(button.getAttribute("data-variant")).toBe("ghost");
    expect(classTokens.has("text-muted-foreground")).toBe(true);
    expect(classTokens.has("hover:bg-secondary/70")).toBe(true);
    expect(classTokens.has("hover:text-foreground")).toBe(true);
  });
});
