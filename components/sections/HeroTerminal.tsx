"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { Badge } from "@/components/ui/badge";

const profileTags = ["React", "Vue", "Node.js", "GSAP", "AI Systems"];

const capabilityRows = [
  { label: "Interaction", value: "交互动效与品牌体验" },
  { label: "AI", value: "检索、标签与工作流接入" },
  { label: "Quality", value: "工程质量与可维护性" },
];

export function HeroTerminal() {
  return (
    <TerminalWindow
      title="Narrative Panel"
      filename="01 / INTRO"
      delay={0.2}
      className="lg:row-span-2"
    >
      <div className="p-5 sm:p-7">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mb-8 space-y-4"
        >
          <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
            Based in Beijing / Selectively available
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Will Zhang
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-foreground/92">
            具备全栈延展能力的前端工程师，专注交互动效、AI 功能与工程质量。
          </p>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
            我擅长把复杂需求拆解为清晰的信息结构、稳定的交互流程与可持续演进的前端实现，
            让产品从概念推进到真正可交付的界面体验。
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mb-8 flex flex-wrap gap-2"
          aria-label="核心技术标签"
        >
          {profileTags.map((tag, index) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.04, duration: 0.18 }}
            >
              <Badge
                variant="outline"
                className="border-border/70 bg-card/65 text-muted-foreground cursor-default px-2.5 py-1 hover:border-blue-400/40 hover:text-foreground"
              >
                {tag}
              </Badge>
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mb-8 grid gap-3 sm:grid-cols-3"
          aria-label="能力方向"
        >
          {capabilityRows.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.08, duration: 0.3 }}
            >
              <div className="border-border/70 bg-card/50 space-y-2 rounded-[2px] border px-4 py-4 transition-colors hover:border-blue-400/40">
                <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="text-sm leading-6 text-foreground/90">{item.value}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="mailto:zwillthink@outlook.com"
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-[2px] px-4 py-2 text-sm transition-opacity hover:opacity-85"
          >
            发邮件
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-sm transition-colors hover:border-blue-400/40 hover:text-blue-500 dark:hover:text-blue-400"
          >
            GitHub
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-muted-foreground mt-8 max-w-2xl text-sm leading-7"
        >
          工作之外会靠训练、出行和拍照调整节奏，保持稳定输出，也保留对细节和环境变化的感知。
        </motion.p>
      </div>
    </TerminalWindow>
  );
}
