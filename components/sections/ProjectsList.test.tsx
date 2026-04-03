import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    article: ({ children, ...props }: React.ComponentProps<"article">) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

import { ProjectsList } from "./ProjectsList";

describe("ProjectsList", () => {
  test("支持单开折叠并在展开后显示关键链接", async () => {
    const user = userEvent.setup();
    const firstDescription = "高质量动画交互，品牌展示站点";
    const secondDescription = "语义检索 + 向量搜索，智能标签匹配";
    const firstProjectButton = "01 企业官网开发";
    const secondProjectButton = "02 AI 视频素材库";

    render(<ProjectsList />);

    expect(screen.getByText("03 / SELECTED WORK")).not.toBeNull();
    expect(screen.getByRole("button", { name: firstProjectButton })).not.toBeNull();
    expect(screen.getByRole("button", { name: secondProjectButton })).not.toBeNull();
    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.queryByText(secondDescription)).toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));

    expect(screen.getByText(firstDescription)).not.toBeNull();
    expect(screen.getByRole("link", { name: /查看源码/i })).not.toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));

    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.queryByRole("link", { name: /查看源码/i })).toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));
    await user.click(screen.getByRole("button", { name: secondProjectButton }));

    expect(screen.getByText(secondDescription)).not.toBeNull();
    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.getByRole("link", { name: /查看源码/i })).not.toBeNull();
  });
});
