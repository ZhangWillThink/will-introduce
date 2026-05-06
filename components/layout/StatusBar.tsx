"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function StatusBar() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="theme-surface theme-status-bar sticky top-0 z-40 border-b border-border/80"
    >
      <div className="theme-frame flex min-h-13 items-center justify-between gap-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-medium tracking-[-0.01em]">
            张卫钰 Will Zhang / Portfolio
          </p>
          <p className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
            Senior Full-stack Engineer
          </p>
        </div>

        <nav className="flex items-center gap-1.5" aria-label="联系方式">
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-status-bar__link"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a href="mailto:zwillthink@163.com" className="theme-status-bar__link" aria-label="Email">
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
