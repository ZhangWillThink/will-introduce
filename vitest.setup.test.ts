import { describe, expect, test } from "vitest";

describe("vitest setup", () => {
  test("installs browser mocks used by UI tests", () => {
    expect(window.matchMedia).toBeTypeOf("function");
    expect(window.HTMLElement.prototype.scrollIntoView).toBeTypeOf("function");
  });
});
