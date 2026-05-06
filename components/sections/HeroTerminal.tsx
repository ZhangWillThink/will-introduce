"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { siteIdentity } from "@/lib/site-content";

export function HeroTerminal() {
  return (
    <TerminalWindow
      title="Narrative Panel"
      filename="01 / INTRO"
      delay={0.2}
      className="flex min-h-0 flex-1 flex-col"
      bodyClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="theme-hero-panel relative flex min-h-0 flex-1 flex-col justify-between gap-8 overflow-hidden p-5 sm:p-7">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="relative z-10 space-y-4"
        >
          <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
            {siteIdentity.locationLine}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {siteIdentity.displayName}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-foreground/92">
            {siteIdentity.roleShort}，{siteIdentity.tagline}
          </p>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
            {siteIdentity.introBlurb}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="border-border/50 relative z-10 flex shrink-0 flex-wrap gap-3 border-t pt-6"
        >
          <a
            href={`mailto:${siteIdentity.email}`}
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-[2px] px-4 py-2 text-sm transition-opacity hover:opacity-85"
          >
            发邮件
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="#contact"
            className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-sm transition-colors hover:border-blue-400/40 hover:text-blue-500 dark:hover:text-blue-400"
          >
            联系方式
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="#projects"
            className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-sm transition-colors hover:border-blue-400/40 hover:text-blue-500 dark:hover:text-blue-400"
          >
            项目
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </motion.div>
      </div>
    </TerminalWindow>
  );
}
