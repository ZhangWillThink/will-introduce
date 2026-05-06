import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.ComponentProps<"span">) => (
      <span {...props}>{children}</span>
    ),
  },
  useSpring: () => ({
    set: vi.fn(),
    get: () => 0,
  }),
  useTransform: (_value: unknown, transform: (latest: number) => string) => transform(0),
  useInView: () => true,
}));

vi.mock("@/components/effects/ProgressBar", () => ({
  ProgressBar: ({ value }: { value: number }) => (
    <div data-testid="progress-bar" data-value={value} />
  ),
}));

import { SkillsMatrix } from "./SkillsMatrix";

describe("SkillsMatrix", () => {
  test("由技能区自身渲染六项能力名称与多组 detail 映射，且默认不显示百分比", () => {
    render(<SkillsMatrix />);

    const list = screen.getByRole("list", { name: "核心能力" });

    expect(within(list).getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getAllByTestId("progress-bar")).toHaveLength(6);
    expect(screen.getByText("React / Vue")).not.toBeNull();
    expect(screen.getByText("复杂前端应用、SSR 框架与组件化界面交付")).not.toBeNull();
    expect(screen.getByText("Node.js / Bun")).not.toBeNull();
    expect(screen.getByText("RESTful API、鉴权、中间件与高性能服务")).not.toBeNull();
    expect(screen.getByText("AI Agent")).not.toBeNull();
    expect(screen.getByText("LLM 工具调用、任务编排与业务数据分析")).not.toBeNull();
    expect(screen.queryByText(/\d+%/)).toBeNull();
  });
});
