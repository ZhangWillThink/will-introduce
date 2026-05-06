import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: React.ComponentProps<"li">) => <li {...props}>{children}</li>,
  },
}));

import { FocusAreas } from "./FocusAreas";

describe("FocusAreas", () => {
  test("以 4 个 listitem 渲染关注方向并保持标题与说明同项配对", () => {
    render(<FocusAreas />);

    const list = screen.getByRole("list", { name: "当前关注方向" });
    const agentItem = screen.getByText("AI Agent 产品化").closest("li");
    const performanceItem = screen.getByText("性能与边缘能力").closest("li");

    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(agentItem as HTMLElement).getByText(
        "围绕工具调用、工作流编排和业务数据分析，把 LLM 能力沉淀为稳定功能。",
      ),
    ).not.toBeNull();
    expect(
      within(performanceItem as HTMLElement).getByText(
        "结合代码拆分、缓存策略与 Cloudflare 边缘能力，持续优化访问体验和稳定性。",
      ),
    ).not.toBeNull();
    expect(screen.queryByText("Focus Areas")).toBeNull();
  });
});
