import { describe, expect, test, vi } from "vitest";

import {
  THEME_SCENE_REQUEST_EVENT,
  dispatchThemeSceneRequest,
  getThemeSceneOrigin,
  resolveThemeSceneTarget,
} from "./theme-scene";

describe("theme-scene", () => {
  test("resolveThemeSceneTarget resolves dark toggle to light", () => {
    expect(
      resolveThemeSceneTarget({
        currentResolvedTheme: "dark",
        request: "toggle",
        systemResolvedTheme: "dark",
      }),
    ).toEqual({
      persistedTheme: "light",
      visualTheme: "light",
    });
  });

  test("resolveThemeSceneTarget keeps system persisted theme and uses system resolved target", () => {
    expect(
      resolveThemeSceneTarget({
        currentResolvedTheme: "dark",
        request: "system",
        systemResolvedTheme: "light",
      }),
    ).toEqual({
      persistedTheme: "system",
      visualTheme: "light",
    });
  });

  test("getThemeSceneOrigin computes center point and radius from source element", () => {
    const source = document.createElement("button");

    vi.spyOn(source, "getBoundingClientRect").mockReturnValue({
      width: 40,
      height: 24,
      x: 100,
      y: 20,
      top: 20,
      left: 100,
      right: 140,
      bottom: 44,
      toJSON: () => ({}),
    });

    expect(getThemeSceneOrigin(source)).toEqual({
      originX: 120,
      originY: 32,
      originRadius: 20,
    });
  });

  test("dispatchThemeSceneRequest dispatches window custom event with request and origin", () => {
    const source = document.createElement("button");

    vi.spyOn(source, "getBoundingClientRect").mockReturnValue({
      width: 32,
      height: 32,
      x: 48,
      y: 16,
      top: 16,
      left: 48,
      right: 80,
      bottom: 48,
      toJSON: () => ({}),
    });

    const handler = vi.fn();
    window.addEventListener(THEME_SCENE_REQUEST_EVENT, handler);

    dispatchThemeSceneRequest({ request: "light", source });

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe(THEME_SCENE_REQUEST_EVENT);
    expect(event.detail).toEqual({
      request: "light",
      origin: {
        originX: 64,
        originY: 32,
        originRadius: 16,
      },
    });

    window.removeEventListener(THEME_SCENE_REQUEST_EVENT, handler);
  });
});
