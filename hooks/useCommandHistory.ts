"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "terminal-command-history";
const MAX_HISTORY = 20;

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 从 sessionStorage 加载
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  // 保存到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((command: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((cmd) => cmd !== command);
      return [command, ...filtered].slice(0, MAX_HISTORY);
    });
    setHistoryIndex(-1);
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down"): string | null => {
      if (history.length === 0) return null;

      if (direction === "up") {
        const newIndex = historyIndex === -1 ? 0 : Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        return history[newIndex];
      } else {
        const newIndex = historyIndex - 1;
        if (newIndex < 0) {
          setHistoryIndex(-1);
          return "";
        }
        setHistoryIndex(newIndex);
        return history[newIndex];
      }
    },
    [history, historyIndex],
  );

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return {
    history,
    historyIndex,
    addToHistory,
    navigateHistory,
    resetHistoryIndex,
  };
}
