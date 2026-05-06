"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  number: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  primaryLink: {
    label: string;
    href: string;
  };
  secondaryLink?: {
    label: string;
    href: string;
  };
}

const projects: Project[] = [
  {
    id: "rings-cli",
    number: "01",
    title: "rings-cli",
    role: "负责人 · Golang · PostgreSQL · LLM",
    description:
      "面向内部算力调度与任务执行的命令行工具，打通大模型能力与计算资源，实现任务解析、分发、执行与结果追踪闭环。",
    tags: ["Golang", "PostgreSQL", "LLM", "CLI"],
    primaryLink: {
      label: "了解项目细节",
      href: "mailto:zwillthink@163.com?subject=rings-cli%20project",
    },
  },
  {
    id: "lunana",
    number: "02",
    title: "Lunana 多媒体平台",
    role: "全栈开发 · Monorepo · AI Agent · CI/CD",
    description:
      "基于 AI 的多媒体内容平台，支持自动生成并推送日报；通过 Agent 对话完成业务操作、工具调用与数据分析。",
    tags: ["pnpm workspace", "VitePlus", "AI Agent", "CI/CD"],
    primaryLink: {
      label: "了解项目细节",
      href: "mailto:zwillthink@163.com?subject=Lunana%20project",
    },
  },
  {
    id: "adtensor",
    number: "03",
    title: "adtensor",
    role: "独立开发 · UI 平台 · 多表单系统",
    description:
      "作为 rings-cli 的 UI 平台，从 0 到 1 完成多表单系统架构、前端工程化与功能迭代，提升任务配置和使用效率。",
    tags: ["React", "Form System", "Engineering", "UX"],
    primaryLink: {
      label: "了解项目细节",
      href: "mailto:zwillthink@163.com?subject=adtensor%20project",
    },
  },
];

export function ProjectsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  return (
    <TerminalWindow
      title="Projects"
      filename="03 / SELECTED WORK"
      delay={0.4}
      className="lg:col-span-2"
    >
      <div className="p-4 sm:p-5">
        <div className="space-y-3">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const buttonLabel = `${project.number} ${project.title}`;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.08, duration: 0.28 }}
                className={cn(
                  "rounded-[2px] border border-border/60 bg-card/30 transition-colors duration-300",
                  isExpanded && "border-blue-400/40 bg-card/50",
                )}
              >
                <div className="flex flex-col gap-3 p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        aria-expanded={isExpanded}
                        className="text-left text-sm font-medium transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                      >
                        {buttonLabel}
                      </button>
                      <p className="text-muted-foreground font-mono text-xs">{project.role}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      aria-expanded={isExpanded}
                      className="text-muted-foreground shrink-0 text-[11px] tracking-[0.16em] uppercase transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    >
                      {isExpanded ? "Close" : "Open"}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-muted/60 text-foreground/85 border-border/60 rounded-[2px] border"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-border/60 space-y-3 border-t pt-3">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-[2px] text-xs hover:border-blue-400/40 hover:bg-blue-500/10"
                              asChild
                            >
                              <a
                                href={project.primaryLink.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.primaryLink.label}
                                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                              </a>
                            </Button>

                            {project.secondaryLink ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-[2px] text-xs hover:border-blue-400/40 hover:bg-blue-500/10"
                                asChild
                              >
                                <a
                                  href={project.secondaryLink.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {project.secondaryLink.label}
                                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                </a>
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </TerminalWindow>
  );
}
