import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Home from "./page";

vi.mock("@/components/layout/StatusBar", () => ({
  StatusBar: () => <div data-testid="status-bar" />,
}));

vi.mock("@/components/layout/Footer", () => ({
  Footer: () => <div data-testid="footer" />,
}));

vi.mock("@/components/layout/CommandBar", () => ({
  CommandBar: () => <div data-testid="command-bar" />,
}));

vi.mock("@/components/sections/HeroTerminal", () => ({
  HeroTerminal: () => <div data-testid="hero-terminal" />,
}));

vi.mock("@/components/sections/SkillsMatrix", () => ({
  SkillsMatrix: () => <div data-testid="skills-matrix" />,
}));

vi.mock("@/components/sections/ProjectsList", () => ({
  ProjectsList: () => <div data-testid="projects-list" />,
}));

vi.mock("@/components/sections/FocusAreas", () => ({
  FocusAreas: () => <div data-testid="focus-areas" />,
}));

vi.mock("@/components/sections/ContactLog", () => ({
  ContactLog: () => <div data-testid="contact-log" />,
}));

describe("Home page skeleton", () => {
  test("渲染背景骨架、skip link 与共享 frame 栅格关系", () => {
    const { container } = render(<Home />);

    expect(container.querySelector(".theme-page__backdrop")).not.toBeNull();

    const skipLink = screen.getByRole("link", { name: "跳到主要内容" });
    expect(skipLink.getAttribute("href")).toBe("#main-content");

    const main = container.querySelector("main#main-content");
    expect(main).not.toBeNull();
    expect(main?.classList.contains("theme-frame")).toBe(true);
    expect(main?.classList.contains("lg:grid-cols-12")).toBe(true);

    const hero = container.querySelector("section#hero");
    const projects = container.querySelector("section#projects");
    const focus = container.querySelector("section#focus");

    expect(hero?.classList.contains("lg:col-span-7")).toBe(true);
    expect(projects?.classList.contains("lg:col-span-7")).toBe(true);
    expect(focus?.classList.contains("lg:col-span-5")).toBe(true);
  });
});
