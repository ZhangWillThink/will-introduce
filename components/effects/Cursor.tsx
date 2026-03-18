"use client";

import { cn } from "@/lib/utils";

interface CursorProps {
  className?: string;
  blink?: boolean;
}

export function Cursor({ className, blink = true }: CursorProps) {
  return (
    <span
      className={cn(
        "inline-block h-4 w-2.5 bg-blue-500/80 align-middle",
        blink && "animate-cursor-blink",
        className,
      )}
      aria-hidden="true"
    />
  );
}
