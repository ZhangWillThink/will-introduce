import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

function matchBlock(css: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "m");
  return css.match(pattern)?.[1] ?? null;
}

function matchMediaBlock(css: string, query: string) {
  const marker = `@media ${query} {`;
  const start = css.indexOf(marker);

  if (start === -1) {
    return null;
  }

  const blockStart = start + marker.length;
  let depth = 1;

  for (let index = blockStart; index < css.length; index += 1) {
    const character = css[index];

    if (character === "{") {
      depth += 1;
      continue;
    }

    if (character === "}") {
      depth -= 1;

      if (depth === 0) {
        return css.slice(blockStart, index);
      }
    }
  }

  return null;
}

describe("globals.css reduced motion safeguards", () => {
  test("prefers-reduced-motion 下关闭主题相关过渡与平滑滚动", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    const reducedMotionBlock = matchMediaBlock(css, "(prefers-reduced-motion: reduce)");

    expect(reducedMotionBlock).not.toBeNull();
    expect(reducedMotionBlock).toContain("transition-duration: 0ms !important;");
    expect(reducedMotionBlock).toContain("animation-duration: 0ms !important;");
    expect(reducedMotionBlock).toContain("scroll-behavior: auto;");
    expect(reducedMotionBlock).toContain(".theme-transition-sweep");
    expect(reducedMotionBlock).toContain("transition-duration: 0ms;");
  });

  test("主题切换扫光层仅过渡透明度，避免整屏背景重绘", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    const sweepBlock = matchBlock(css, ".theme-transition-sweep");

    expect(sweepBlock).not.toBeNull();
    expect(sweepBlock).toContain("transition: opacity 100ms ease;");
    expect(sweepBlock).not.toContain("background 100ms ease");
  });

  test("深色主题显式声明 dark color-scheme，确保原生控件外观一致", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    const darkBlock = matchBlock(css, ".dark");

    expect(darkBlock).not.toBeNull();
    expect(darkBlock).toContain("color-scheme: dark;");
  });

  test("显式亮色主题收窄 color-scheme 并锁定降强参数", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    const rootBlock = matchBlock(css, ":root");

    expect(rootBlock).not.toBeNull();
    expect(rootBlock).toContain("color-scheme: light;");
    expect(css).toContain("--theme-scene-overlay-opacity: 0.22;");
    expect(css).toContain("--theme-scene-overlay-opacity: 0.9;");
    expect(css).toContain("--theme-scene-overlay-opacity: 0.14;");
    expect(css).toContain("transparent calc(var(--theme-scene-origin-radius) + 14rem)");
  });
});
