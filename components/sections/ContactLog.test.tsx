import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

import { ContactLog } from "./ContactLog";

describe("ContactLog", () => {
  test("以 definition list 结构渲染 3 条联系项并保留正确链接", () => {
    const { container } = render(<ContactLog />);

    const definitionList = container.querySelector("dl");
    const terms = definitionList?.querySelectorAll("dt");
    const definitions = definitionList?.querySelectorAll("dd");
    const emailTerm = screen.getByText("Email").closest("dt");
    const githubTerm = screen.getByText("GitHub").closest("dt");
    const locationTerm = screen.getByText("Location").closest("dt");
    const emailLink = screen.getByRole("link", { name: "zwillthink@outlook.com" });
    const githubLink = screen.getByRole("link", { name: "@ZhangWillThink" });

    expect(screen.getByText("04 / CONTACT")).not.toBeNull();
    expect(definitionList).not.toBeNull();
    expect(terms).toHaveLength(3);
    expect(definitions).toHaveLength(3);
    expect(emailTerm?.parentElement?.querySelector("dd")?.textContent).toContain(
      "zwillthink@outlook.com",
    );
    expect(githubTerm?.parentElement?.querySelector("dd")?.textContent).toContain("@ZhangWillThink");
    expect(locationTerm?.parentElement?.querySelector("dd")?.textContent).toContain("Beijing, CN");
    expect(emailLink.getAttribute("href")).toBe("mailto:zwillthink@outlook.com");
    expect(githubLink.getAttribute("href")).toBe("https://github.com/ZhangWillThink");
    expect(screen.getByText("当前状态")).not.toBeNull();
    expect(screen.getByText("开放合作与交流")).not.toBeNull();
    expect(screen.queryByText("Current Status")).toBeNull();
  });
});
