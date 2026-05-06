import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
}));

import { ContactLog } from "./ContactLog";

describe("ContactLog", () => {
  test("以 definition list 结构渲染 4 条联系项并保留正确链接", () => {
    const { container } = render(<ContactLog />);

    const definitionList = container.querySelector("dl");
    const terms = definitionList?.querySelectorAll("dt");
    const definitions = definitionList?.querySelectorAll("dd");
    const emailTerm = screen.getByText("Email").closest("dt");
    const phoneTerm = screen.getByText("Phone").closest("dt");
    const githubTerm = screen.getByText("GitHub").closest("dt");
    const locationTerm = screen.getByText("Location").closest("dt");
    const emailLink = screen.getByRole("link", {
      name: "zwillthink@163.com",
    });
    const phoneLink = screen.getByRole("link", { name: "19231172850" });
    const githubLink = screen.getByRole("link", { name: "@ZhangWillThink" });

    expect(screen.getByText("04 / CONTACT")).not.toBeNull();
    expect(definitionList).not.toBeNull();
    expect(terms).toHaveLength(4);
    expect(definitions).toHaveLength(4);
    expect(emailTerm?.parentElement?.querySelector("dd")?.textContent).toContain(
      "zwillthink@163.com",
    );
    expect(phoneTerm?.parentElement?.querySelector("dd")?.textContent).toContain("19231172850");
    expect(githubTerm?.parentElement?.querySelector("dd")?.textContent).toContain(
      "@ZhangWillThink",
    );
    expect(locationTerm?.parentElement?.querySelector("dd")?.textContent).toContain("北京市朝阳区");
    expect(emailLink.getAttribute("href")).toBe("mailto:zwillthink@163.com");
    expect(phoneLink.getAttribute("href")).toBe("tel:19231172850");
    expect(githubLink.getAttribute("href")).toBe("https://github.com/ZhangWillThink");
    expect(screen.getByText("当前状态")).not.toBeNull();
    expect(screen.getByText("离职，可快速到岗")).not.toBeNull();
    expect(screen.queryByText("Current Status")).toBeNull();
  });
});
