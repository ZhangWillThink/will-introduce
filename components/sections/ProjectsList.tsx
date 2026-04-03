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
    id: "corporate-site",
    number: "01",
    title: "企业官网开发",
    role: "GSAP · React · 品牌站点",
    description: "高质量动画交互，品牌展示站点",
    tags: ["GSAP", "React", "品牌体验"],
    primaryLink: {
      label: "查看案例",
      href: "https://example.com",
    },
    secondaryLink: {
      label: "查看源码",
      href: "https://github.com/ZhangWillThink",
    },
  },
  {
    id: "ai-video-library",
    number: "02",
    title: "AI 视频素材库",
    role: "Node.js · Vector Search · AI 检索",
    description: "语义检索 + 向量搜索，智能标签匹配",
    tags: ["Node.js", "Vector Search", "智能标签"],
    primaryLink: {
      label: "查看案例",
      href: "https://example.com/ai-video-library",
    },
    secondaryLink: {
      label: "查看源码",
      href: "https://github.com/ZhangWillThink",
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
                              <a href={project.primaryLink.href} target="_blank" rel="noopener noreferrer">
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
