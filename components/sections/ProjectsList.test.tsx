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
    const firstDescription =
      "面向内部算力调度与任务执行的命令行工具，打通大模型能力与计算资源，实现任务解析、分发、执行与结果追踪闭环。";
    const secondDescription =
      "基于 AI 的多媒体内容平台，支持自动生成并推送日报；通过 Agent 对话完成业务操作、工具调用与数据分析。";
    const firstProjectButton = "01 rings-cli";
    const secondProjectButton = "02 Lunana 多媒体平台";

    render(<ProjectsList />);

    expect(screen.getByText("03 / SELECTED WORK")).not.toBeNull();
    expect(screen.getByRole("button", { name: firstProjectButton })).not.toBeNull();
    expect(screen.getByRole("button", { name: secondProjectButton })).not.toBeNull();
    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.queryByText(secondDescription)).toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));

    expect(screen.getByText(firstDescription)).not.toBeNull();
    expect(screen.getByRole("link", { name: /了解项目细节/i })).not.toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));

    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.queryByRole("link", { name: /了解项目细节/i })).toBeNull();

    await user.click(screen.getByRole("button", { name: firstProjectButton }));
    await user.click(screen.getByRole("button", { name: secondProjectButton }));

    expect(screen.getByText(secondDescription)).not.toBeNull();
    expect(screen.queryByText(firstDescription)).toBeNull();
    expect(screen.getByRole("link", { name: /了解项目细节/i })).not.toBeNull();
  });
});
