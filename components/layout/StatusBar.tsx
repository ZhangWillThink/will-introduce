"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function StatusBar() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="theme-surface theme-status-bar sticky top-0 z-40 border-b border-border/80"
    >
      <div className="theme-frame flex min-h-13 flex-wrap items-center gap-x-5 gap-y-2 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-medium tracking-[-0.01em]">Will Zhang / Portfolio</p>
          <p className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
            Frontend Engineer
          </p>
        </div>

        <p className="text-muted-foreground order-3 w-full text-[11px] tracking-[0.12em] uppercase lg:order-none lg:w-auto lg:flex-none">
          当前开放前端与 AI 产品合作
        </p>

        <nav className="flex items-center gap-1.5" aria-label="联系方式">
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-status-bar__link"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="mailto:zwillthink@outlook.com"
            className="theme-status-bar__link"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
