"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TerminalWindowProps {
  title: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function TerminalWindow({
  title,
  filename,
  children,
  className,
  delay = 0,
  collapsible = false,
  defaultCollapsed = false,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      data-theme-surface="window"
      className={cn(
        "theme-surface group relative overflow-hidden rounded-[2px] border border-border/80",
        className,
      )}
    >
      {(filename || title) && (
        <div className="theme-terminal-window__header flex items-end justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
          {filename ? <span className="theme-eyebrow">{filename}</span> : <span />}
          {title ? (
            <span className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
              {title}
            </span>
          ) : null}
        </div>
      )}

      <div className={cn(collapsible && defaultCollapsed && "hidden")}>
        {children}
      </div>
    </motion.div>
  );
}
