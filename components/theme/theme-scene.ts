export const THEME_SCENE_REQUEST_EVENT = "theme-scene-request";

export type ThemeChoice = "light" | "dark";
export type ThemeRequest = ThemeChoice | "system" | "toggle";
export type ResolvedTheme = ThemeChoice;

export type ThemeSceneOrigin = {
  originX: number;
  originY: number;
  originRadius: number;
};

export type ThemeSceneRequestDetail = {
  request: ThemeRequest;
  origin: ThemeSceneOrigin;
};

export type ThemeSceneTarget = {
  persistedTheme: ThemeChoice | "system";
  visualTheme: ResolvedTheme;
};

type ResolveThemeSceneTargetInput = {
  currentResolvedTheme: ResolvedTheme;
  request: ThemeRequest;
  systemResolvedTheme: ResolvedTheme;
};

export function resolveThemeSceneTarget({
  currentResolvedTheme,
  request,
  systemResolvedTheme,
}: ResolveThemeSceneTargetInput): ThemeSceneTarget {
  if (request === "toggle") {
    const nextTheme = currentResolvedTheme === "dark" ? "light" : "dark";

    return {
      persistedTheme: nextTheme,
      visualTheme: nextTheme,
    };
  }

  if (request === "system") {
    return {
      persistedTheme: "system",
      visualTheme: systemResolvedTheme,
    };
  }

  return {
    persistedTheme: request,
    visualTheme: request,
  };
}

export function getThemeSceneOrigin(source?: Element | null): ThemeSceneOrigin {
  if (!source) {
    return {
      originX: window.innerWidth,
      originY: 0,
      originRadius: 0,
    };
  }

  const rect = source.getBoundingClientRect();

  return {
    originX: rect.left + rect.width / 2,
    originY: rect.top + rect.height / 2,
    originRadius: Math.max(rect.width, rect.height) / 2,
  };
}

export function dispatchThemeSceneRequest(
  requestOrInput: ThemeRequest | { request: ThemeRequest; source?: Element | null },
  sourceArg?: Element | null,
): void {
  const request =
    typeof requestOrInput === "string" ? requestOrInput : requestOrInput.request;
  const source = typeof requestOrInput === "string" ? sourceArg : requestOrInput.source;

  window.dispatchEvent(
    new CustomEvent<ThemeSceneRequestDetail>(THEME_SCENE_REQUEST_EVENT, {
      detail: {
        request,
        origin: getThemeSceneOrigin(source),
      },
    }),
  );
}
