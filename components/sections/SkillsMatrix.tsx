"use client";

import { Atom, Layers, Server, Wand2, Braces, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { ProgressBar } from "@/components/effects/ProgressBar";

interface Skill {
  name: string;
  Icon: LucideIcon;
  level: number;
  detail: string;
  color?: "blue" | "violet" | "emerald" | "amber";
}

const skills: Skill[] = [
  {
    name: "React / Vue",
    Icon: Atom,
    level: 0.9,
    detail: "复杂前端应用、SSR 框架与组件化界面交付",
    color: "blue",
  },
  {
    name: "TypeScript",
    Icon: Layers,
    level: 0.9,
    detail: "类型安全、代码质量与可维护系统设计",
    color: "violet",
  },
  {
    name: "Node.js / Bun",
    Icon: Server,
    level: 0.82,
    detail: "RESTful API、鉴权、中间件与高性能服务",
    color: "emerald",
  },
  {
    name: "Monorepo",
    Icon: Wand2,
    level: 0.86,
    detail: "pnpm workspace、Turborepo / Nx 与依赖治理",
    color: "blue",
  },
  {
    name: "Testing / CI",
    Icon: Braces,
    level: 0.78,
    detail: "单元测试、端到端测试与自动化交付流程",
    color: "violet",
  },
  {
    name: "AI Agent",
    Icon: Sparkles,
    level: 0.82,
    detail: "LLM 工具调用、任务编排与业务数据分析",
    color: "amber",
  },
];

export function SkillsMatrix() {
  return (
    <TerminalWindow
      title="Capabilities"
      filename="02 / CAPABILITIES"
      delay={0.3}
      className="h-full"
    >
      <div className="p-4 sm:p-5">
        <ul aria-label="核心能力" className="divide-border/50 flex flex-col divide-y">
          {skills.map((skill) => (
            <li key={skill.name} className="py-3">
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground flex h-5 w-5 items-center justify-center pt-0.5">
                  <skill.Icon className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="space-y-1">
                    <p className="font-mono text-sm font-medium">{skill.name}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{skill.detail}</p>
                  </div>

                  <ProgressBar value={skill.level} color={skill.color} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </TerminalWindow>
  );
}
