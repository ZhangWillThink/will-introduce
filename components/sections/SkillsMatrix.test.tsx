import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.ComponentProps<"span">) => <span {...props}>{children}</span>,
  },
  useSpring: () => ({
    set: vi.fn(),
    get: () => 0,
  }),
  useTransform: (_value: unknown, transform: (latest: number) => string) => transform(0),
  useInView: () => true,
}));

vi.mock("@/components/effects/ProgressBar", () => ({
  ProgressBar: ({ value }: { value: number }) => <div data-testid="progress-bar" data-value={value} />,
}));

import { SkillsMatrix } from "./SkillsMatrix";

describe("SkillsMatrix", () => {
  test("由技能区自身渲染六项能力名称与多组 detail 映射，且默认不显示百分比", () => {
    render(<SkillsMatrix />);

    const list = screen.getByRole("list", { name: "核心能力" });

    expect(within(list).getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getAllByTestId("progress-bar")).toHaveLength(6);
    expect(screen.getByText("React")).not.toBeNull();
    expect(screen.getByText("企业官网与复杂交互动效交付")).not.toBeNull();
    expect(screen.getByText("Vue 3")).not.toBeNull();
    expect(screen.getByText("后台系统与业务交互组件整理")).not.toBeNull();
    expect(screen.getByText("AI/LLM")).not.toBeNull();
    expect(screen.getByText("检索、标签与工作流接入")).not.toBeNull();
    expect(screen.queryByText(/\d+%/)).toBeNull();
  });
});
