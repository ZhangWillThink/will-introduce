"use client";

import { motion } from "framer-motion";
import { Target, Cpu, Cloud, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TerminalWindow } from "@/components/layout/TerminalWindow";

interface FocusArea {
  title: string;
  desc: string;
  Icon: LucideIcon;
}

const focusAreas: FocusArea[] = [
  {
    title: "AI Agent 产品化",
    desc: "围绕工具调用、工作流编排和业务数据分析，把 LLM 能力沉淀为稳定功能。",
    Icon: Target,
  },
  {
    title: "任务调度与自动化",
    desc: "将大模型、CLI 与计算资源调度串联起来，提升任务执行效率和资源利用率。",
    Icon: Cpu,
  },
  {
    title: "Monorepo 工程化",
    desc: "通过 pnpm workspace、公共包抽离和统一规范，提升多应用协作与交付质量。",
    Icon: Cloud,
  },
  {
    title: "性能与边缘能力",
    desc: "结合代码拆分、缓存策略与 Cloudflare 边缘能力，持续优化访问体验和稳定性。",
    Icon: Activity,
  },
];

export function FocusAreas() {
  return (
    <TerminalWindow title="Tracking" filename="05 / CURRENTLY TRACKING" delay={0.5}>
      <div className="p-4 sm:p-5">
        <ul aria-label="当前关注方向" className="space-y-4">
          {focusAreas.map((area, index) => (
            <motion.li
              key={area.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              className="grid grid-cols-[16px_1fr] items-start gap-3 border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="mt-0.5 text-blue-500 dark:text-blue-400">
                <area.Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{area.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{area.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </TerminalWindow>
  );
}
