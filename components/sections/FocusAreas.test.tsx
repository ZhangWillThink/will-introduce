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
    const websiteUpgradeItem = screen.getByText("官网体验升级").closest("li");
    const observabilityItem = screen.getByText("性能与可观测性").closest("li");

    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    expect(within(websiteUpgradeItem as HTMLElement).getByText("在保证加载速度的前提下，持续优化品牌叙事、交互动画和信息结构。")).not.toBeNull();
    expect(within(observabilityItem as HTMLElement).getByText("建立 Web Vitals、日志与告警闭环，用真实数据持续驱动体验优化。")).not.toBeNull();
    expect(screen.queryByText("Focus Areas")).toBeNull();
  });
});
