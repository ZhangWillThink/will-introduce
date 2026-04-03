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
  { name: "React", Icon: Atom, level: 0.85, detail: "企业官网与复杂交互动效交付", color: "blue" },
  { name: "Vue 3", Icon: Layers, level: 0.8, detail: "后台系统与业务交互组件整理", color: "violet" },
  { name: "Node.js", Icon: Server, level: 0.75, detail: "接口整合、工具链与服务协作", color: "emerald" },
  { name: "GSAP", Icon: Wand2, level: 0.88, detail: "品牌叙事、滚动节奏与动效系统", color: "blue" },
  {
    name: "TypeScript",
    Icon: Braces,
    level: 0.9,
    detail: "类型边界、组件契约与可维护性",
    color: "violet",
  },
  { name: "AI/LLM", Icon: Sparkles, level: 0.72, detail: "检索、标签与工作流接入", color: "amber" },
];

export function SkillsMatrix() {
  return (
    <TerminalWindow title="Capabilities" filename="02 / CAPABILITIES" delay={0.3} className="h-full">
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

        <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
          技术的价值不在堆叠名词，而在帮助信息更易读、交互更可信，让复杂系统保持清晰与稳定。
        </p>
      </div>
    </TerminalWindow>
  );
}
