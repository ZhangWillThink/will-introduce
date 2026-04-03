import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Badge } from "./badge";

function getClassTokens(element: HTMLElement) {
  return new Set(element.className.split(/\s+/).filter(Boolean));
}

describe("Badge", () => {
  test("标签使用 rounded-[2px] 且不再包含 rounded-full", () => {
    render(<Badge>Status</Badge>);

    const badge = screen.getByText("Status");
    const classTokens = getClassTokens(badge);

    expect(classTokens.has("rounded-[2px]")).toBe(true);
    expect(classTokens.has("rounded-full")).toBe(false);
  });

  test("outline 变体保留清晰边框语义", () => {
    render(<Badge variant="outline">Outline</Badge>);

    const badge = screen.getByText("Outline");
    const classTokens = getClassTokens(badge);

    expect(badge.getAttribute("data-variant")).toBe("outline");
    expect(classTokens.has("border-border")).toBe(true);
    expect(classTokens.has("bg-transparent")).toBe(true);
    expect(classTokens.has("text-foreground")).toBe(true);
  });

  test("ghost 变体保留克制的前景与 hover 语义", () => {
    render(<Badge variant="ghost">Ghost</Badge>);

    const badge = screen.getByText("Ghost");
    const classTokens = getClassTokens(badge);

    expect(badge.getAttribute("data-variant")).toBe("ghost");
    expect(classTokens.has("text-muted-foreground")).toBe(true);
    expect(classTokens.has("[a&]:hover:bg-secondary/60")).toBe(true);
    expect(classTokens.has("[a&]:hover:text-foreground")).toBe(true);
  });
});
