"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dispatchThemeSceneRequest } from "@/components/theme/theme-scene";
import { cn } from "@/lib/utils";

// 命令定义
interface CommandDef {
  name: string;
  aliases?: string[];
  description: string;
  category: "navigation" | "info" | "action" | "system" | "easter-egg";
  handler: (args?: string) => void;
  usage?: string;
  hidden?: boolean;
}

// 命令输出
interface CommandOutput {
  type: "text" | "code" | "table" | "error" | "success";
  content: string | React.ReactNode;
}

// 命令历史项
interface HistoryItem {
  command: string;
  timestamp: number;
  output?: CommandOutput;
}

const STORAGE_KEY = "terminal-history";
const MAX_HISTORY = 50;

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<CommandDef[]>([]);
  const [outputs, setOutputs] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputsEndRef = useRef<HTMLDivElement>(null);

  // 命令定义
  const commands: CommandDef[] = [
    // 导航命令
    {
      name: "help",
      aliases: ["h", "?"],
      description: "显示帮助信息",
      category: "system",
      usage: "help [command]",
      handler: (args) => handleHelp(args),
    },
    {
      name: "go",
      aliases: ["cd", "nav", "navigate"],
      description: "导航到指定区域",
      category: "navigation",
      usage: "go <hero|skills|projects|focus|contact>",
      handler: (args) => handleGo(args),
    },
    {
      name: "open",
      aliases: ["o"],
      description: "打开项目或链接",
      category: "navigation",
      usage: "open <project-name|github|email>",
      handler: (args) => handleOpen(args),
    },

    // 信息命令
    {
      name: "whoami",
      description: "显示个人信息",
      category: "info",
      handler: () => handleWhoami(),
    },
    {
      name: "skills",
      aliases: ["stack", "tech"],
      description: "查看技能列表",
      category: "info",
      handler: () => handleSkills(),
    },
    {
      name: "projects",
      aliases: ["proj", "work"],
      description: "查看项目列表",
      category: "info",
      handler: () => handleProjects(),
    },
    {
      name: "contact",
      aliases: ["email", "social"],
      description: "查看联系方式",
      category: "info",
      handler: () => handleContact(),
    },
    {
      name: "focus",
      aliases: ["research"],
      description: "查看研究方向",
      category: "info",
      handler: () => handleFocus(),
    },

    // 操作命令
    {
      name: "theme",
      aliases: ["t"],
      description: "切换主题",
      category: "action",
      usage: "theme <dark|light|system>",
      handler: (args) => handleTheme(args),
    },
    {
      name: "clear",
      aliases: ["cls"],
      description: "清空终端输出",
      category: "system",
      handler: () => {
        setOutputs([]);
        setInput("");
        return;
      },
    },

    // 彩蛋命令
    {
      name: "neofetch",
      description: "显示系统信息",
      category: "easter-egg",
      hidden: true,
      handler: () => handleNeofetch(),
    },
    {
      name: "matrix",
      description: "进入矩阵世界",
      category: "easter-egg",
      hidden: true,
      handler: () => handleMatrix(),
    },
    {
      name: "sudo",
      description: "获取管理员权限",
      category: "easter-egg",
      handler: () => handleSudo(),
    },
    {
      name: "ls",
      aliases: ["dir"],
      description: "列出内容",
      category: "system",
      hidden: true,
      handler: () => handleLs(),
    },
    {
      name: "cat",
      description: "查看文件内容",
      category: "system",
      hidden: true,
      usage: "cat <file>",
      handler: (args) => handleCat(args),
    },
    {
      name: "date",
      description: "显示当前时间",
      category: "system",
      hidden: true,
      handler: () => handleDate(),
    },
    {
      name: "history",
      aliases: ["hi"],
      description: "显示命令历史",
      category: "system",
      handler: () => handleHistory(),
    },
  ];

  // 从 localStorage 加载历史
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  }, [history]);

  // 滚动到底部
  useEffect(() => {
    if (outputs.length > 0) {
      outputsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [outputs]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 按 / 打开终端（当焦点不在 input 上）
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      // 按 Escape 关闭
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 过滤建议
  useEffect(() => {
    if (input.trim()) {
      const query = input.toLowerCase().trim();
      const filtered = commands.filter(
        (cmd) =>
          !cmd.hidden &&
          (cmd.name.toLowerCase().includes(query) ||
            cmd.aliases?.some((alias) => alias.toLowerCase().includes(query))),
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // 查找命令
  const findCommand = useCallback(
    (name: string): CommandDef | undefined => {
      const lowerName = name.toLowerCase();
      return commands.find(
        (cmd) =>
          cmd.name.toLowerCase() === lowerName ||
          cmd.aliases?.some((a) => a.toLowerCase() === lowerName),
      );
    },
    [commands],
  );

  // 添加输出
  const addOutput = useCallback((output: CommandOutput) => {
    setOutputs((prev) => [
      ...prev,
      {
        command: "",
        timestamp: Date.now(),
        output,
      },
    ]);
  }, []);

  // 执行命令
  const executeCommand = useCallback(
    (cmdString: string) => {
      const trimmed = cmdString.trim();
      if (!trimmed) return;

      // 添加到历史
      setHistory((prev) => {
        const newHistory = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY);
        return newHistory;
      });

      // 解析命令
      const parts = trimmed.split(/\s+/);
      const cmdName = parts[0];
      const args = parts.slice(1).join(" ");

      // 查找命令
      const cmd = findCommand(cmdName);

      if (cmd) {
        // 添加到输出
        setOutputs((prev) => [
          ...prev,
          {
            command: trimmed,
            timestamp: Date.now(),
          },
        ]);
        // 执行命令
        cmd.handler(args);
      } else {
        addOutput({
          type: "error",
          content: `命令不存在：${cmdName}\n输入 'help' 查看可用命令`,
        });
      }

      setInput("");
      setHistoryIndex(-1);
    },
    [findCommand, addOutput],
  );

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        executeCommand(input);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0].name + " ");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? 0 : Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex - 1;
        if (newIndex < 0) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  // ========== 命令处理器 ==========

  const handleGo = (args?: string) => {
    const sectionMap: Record<string, string> = {
      hero: "hero",
      about: "hero",
      skills: "skills",
      projects: "projects",
      project: "projects",
      focus: "focus",
      research: "focus",
      contact: "contact",
    };
    const target = args?.toLowerCase() || "";
    const sectionId = sectionMap[target];

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        addOutput({ type: "success", content: `导航到 ${sectionId} 区域` });
      }
    } else {
      addOutput({
        type: "error",
        content: `用法：go <hero|skills|projects|focus|contact>\n未知区域：${args || "(未指定)"}`,
      });
    }
  };

  const handleOpen = (args?: string) => {
    const target = args?.toLowerCase() || "";

    const links: Record<string, string> = {
      github: "https://github.com/ZhangWillThink",
      gh: "https://github.com/ZhangWillThink",
      email: "mailto:zwillthink@outlook.com",
      corporate: "#",
      "corporate-site": "#",
      "ai-video": "#",
      "ai-video-library": "#",
    };

    if (target && links[target]) {
      window.open(links[target], "_blank", "noopener,noreferrer");
      addOutput({ type: "success", content: `打开：${target}` });
    } else {
      addOutput({
        type: "error",
        content: `用法：open <github|email|corporate|ai-video>\n未知目标：${args || "(未指定)"}`,
      });
    }
  };

  const handleHelp = (args?: string) => {
    if (args) {
      // 显示具体命令的帮助
      const cmd = findCommand(args);
      if (cmd) {
        addOutput({
          type: "text",
          content: (
            <div className="space-y-1">
              <p className="font-mono text-blue-400">
                {cmd.name}
                {cmd.aliases && ` (${cmd.aliases.join(", ")})`}
              </p>
              <p className="text-foreground">{cmd.description}</p>
              {cmd.usage && <p className="text-muted-foreground text-xs">用法：{cmd.usage}</p>}
            </div>
          ),
        });
        return;
      }
    }

    // 显示所有命令
    const categories: Record<string, CommandDef[]> = {};
    commands
      .filter((c) => !c.hidden)
      .forEach((cmd) => {
        if (!categories[cmd.category]) categories[cmd.category] = [];
        categories[cmd.category].push(cmd);
      });

    addOutput({
      type: "code",
      content: (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            可用命令（输入 'help &lt;command&gt;' 查看详细信息）
          </p>
          {Object.entries(categories).map(([category, cmds]) => (
            <div key={category}>
              <p className="mb-1 text-xs tracking-wider text-blue-400 uppercase">{category}</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {cmds.map((cmd) => (
                  <div key={cmd.name} className="font-mono text-xs">
                    <span className="text-emerald-400">{cmd.name}</span>
                    {cmd.aliases && (
                      <span className="text-muted-foreground"> ({cmd.aliases.join(", ")})</span>
                    )}
                    <span className="text-muted-foreground ml-2">- {cmd.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-muted-foreground border-border/30 border-t pt-2 text-xs">
            提示：按 / 快速打开终端，Tab 补全命令，↑↓ 查看历史
          </p>
        </div>
      ),
    });
  };

  const handleWhoami = () => {
    addOutput({
      type: "code",
      content: (
        <pre className="text-xs leading-relaxed">
          <span className="text-blue-400">{`
   __      __   _
   \\ \\    / /__| | __ _ _ __
    \\ \\/\\/ / _ \\ |/ _\` | '_ \\
     \\ /\\  /  __/ | (_| | | | |
      \\/  \\/ \\___|_|\\__,_|_| |_|
`}</span>
          <span className="text-foreground">Will Zhang - 前端工程师</span>
          <span className="text-muted-foreground">
            具备全栈能力的前端工程师，擅长用 GSAP 打造高质量动画交互， 同时深入 AI
            功能开发，以技术驱动产品体验。
          </span>

          <span className="mt-2 block text-emerald-400">
            核心技能：React · Vue · Node.js · GSAP · TypeScript · AI/LLM
          </span>
        </pre>
      ),
    });
  };

  const handleSkills = () => {
    const skills = [
      { name: "React", level: 85 },
      { name: "Vue 3", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "GSAP", level: 88 },
      { name: "TypeScript", level: 90 },
      { name: "AI/LLM", level: 72 },
    ];

    addOutput({
      type: "code",
      content: (
        <div className="space-y-1">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2">
              <span className="w-20 font-mono text-xs">{skill.name}</span>
              <div className="bg-muted/30 h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-muted-foreground w-10 font-mono text-xs">{skill.level}%</span>
            </div>
          ))}
        </div>
      ),
    });
  };

  const handleProjects = () => {
    addOutput({
      type: "code",
      content: (
        <div className="space-y-2">
          <div className="border-l-2 border-blue-500 pl-3">
            <p className="font-mono text-sm text-emerald-400">📁 corporate-site/</p>
            <p className="text-foreground mt-1 text-xs">企业官网开发 - GSAP · React</p>
            <p className="text-muted-foreground text-xs">高质量动画交互，品牌展示站点</p>
          </div>
          <div className="border-l-2 border-violet-500 pl-3">
            <p className="font-mono text-sm text-emerald-400">📁 ai-video-library/</p>
            <p className="text-foreground mt-1 text-xs">AI 视频素材库 - Node.js · Vector Search</p>
            <p className="text-muted-foreground text-xs">语义检索 + 向量搜索，智能标签匹配</p>
          </div>
        </div>
      ),
    });
  };

  const handleContact = () => {
    addOutput({
      type: "code",
      content: (
        <div className="space-y-2">
          <p className="font-mono text-xs">
            <span className="text-blue-400">Email:</span>{" "}
            <a href="mailto:zwillthink@outlook.com" className="text-emerald-400 hover:underline">
              zwillthink@outlook.com
            </a>
          </p>
          <p className="font-mono text-xs">
            <span className="text-blue-400">GitHub:</span>{" "}
            <a
              href="https://github.com/ZhangWillThink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              @ZhangWillThink
            </a>
          </p>
          <p className="font-mono text-xs">
            <span className="text-blue-400">Location:</span> Beijing, CN
          </p>
          <p className="font-mono text-xs">
            <span className="text-emerald-400">●</span> Available for opportunities
          </p>
        </div>
      ),
    });
  };

  const handleFocus = () => {
    const focusAreas = [
      { title: "官网体验升级", icon: "🎯" },
      { title: "AI 功能产品化", icon: "🤖" },
      { title: "Cloudflare 边缘部署", icon: "☁️" },
      { title: "性能与可观测性", icon: "📊" },
    ];

    addOutput({
      type: "code",
      content: (
        <div className="grid grid-cols-1 gap-2">
          {focusAreas.map((area) => (
            <div key={area.title} className="flex items-center gap-2">
              <span className="text-lg">{area.icon}</span>
              <span className="text-foreground text-sm">{area.title}</span>
            </div>
          ))}
        </div>
      ),
    });
  };

  const handleTheme = (args?: string) => {
    const theme = args?.toLowerCase() || "toggle";

    if (theme === "dark" || theme === "light" || theme === "system") {
      dispatchThemeSceneRequest(theme);
      addOutput({ type: "success", content: `主题切换：${theme}` });
    } else if (theme === "toggle") {
      dispatchThemeSceneRequest("toggle");
      addOutput({ type: "success", content: "主题已切换" });
    } else {
      addOutput({
        type: "error",
        content: `用法：theme <dark|light|system>\n未知主题：${args}`,
      });
    }
  };

  // 彩蛋命令处理器
  const handleNeofetch = () => {
    addOutput({
      type: "code",
      content: (
        <pre className="text-xs leading-relaxed">
          <span className="text-blue-400">{`
       .__.
      /|  |\\
       |  |      will@portfolio
      /   \\     -------------
     |     |    OS: Linux x86_64
     |     |    Browser: ${navigator.userAgent.split(" ").pop()}
    /|     |\\   Shell: Browser Terminal
   / |     | \\  Uptime: ${Math.floor(performance.now() / 60000)} mins
  |  |     |  | Resolution: ${window.innerWidth}x${window.innerHeight}
  |  |     |  | Memory: ${Math.round((performance as any).memory?.usedJSHeapSize / 1048576) || "?"} MB
  |__|     |__|
          `}</span>
        </pre>
      ),
    });
  };

  const handleMatrix = () => {
    addOutput({
      type: "text",
      content: (
        <div className="space-y-1 font-mono text-xs text-emerald-400">
          <p>Welcome to the Matrix...</p>
          <p className="animate-pulse">Follow the white rabbit.</p>
        </div>
      ),
    });
  };

  const handleSudo = () => {
    addOutput({
      type: "error",
      content: `用户不在 sudoers 文件中。此事将被报告。`,
    });
  };

  const handleLs = () => {
    addOutput({
      type: "code",
      content: (
        <div className="flex flex-wrap gap-4">
          <span className="text-blue-400">about.txt</span>
          <span className="text-blue-400">skills.json</span>
          <span className="text-blue-400">projects/</span>
          <span className="text-blue-400">focus.md</span>
          <span className="text-blue-400">contact.log</span>
        </div>
      ),
    });
  };

  const handleCat = (args?: string) => {
    if (!args) {
      addOutput({ type: "error", content: "用法：cat &lt;file&gt;" });
      return;
    }
    const files: Record<string, string> = {
      "about.txt": "Will Zhang - 前端工程师",
      "skills.json": '{"React": 85, "Vue": 80, "Node.js": 75, "GSAP": 88}',
    };
    if (files[args]) {
      addOutput({ type: "code", content: files[args] });
    } else {
      addOutput({ type: "error", content: `cat: ${args}: 文件不存在` });
    }
  };

  const handleDate = () => {
    addOutput({ type: "text", content: new Date().toString() });
  };

  const handleHistory = () => {
    addOutput({
      type: "code",
      content: (
        <div className="space-y-1">
          {history.slice(0, 20).map((cmd, i) => (
            <p key={i} className="text-muted-foreground font-mono text-xs">
              {i + 1} {cmd}
            </p>
          ))}
        </div>
      ),
    });
  };

  // ========== 渲染 ==========

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50">
      {/* 快捷入口 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="flex justify-center pb-4"
          >
            <Button
              variant="outline"
              size="sm"
              aria-label="打开快捷命令面板"
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="theme-command-launcher border-border/60 bg-background/85 text-muted-foreground hover:text-foreground gap-2 rounded-full px-3 shadow-sm backdrop-blur-sm"
            >
              <Command data-icon="inline-start" />
              <span>Quick Commands</span>
              <span className="bg-muted text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                /
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 快捷命令面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="theme-surface theme-command-panel border-border/70 bg-background/95 border-t backdrop-blur-md"
          >
            <div className="mx-auto flex max-h-[60vh] max-w-4xl flex-col">
              <div className="border-border/50 bg-background/80 flex items-start justify-between border-b px-4 py-3">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Command className="text-muted-foreground size-4" />
                    <h2 className="text-sm font-medium">Quick Commands</h2>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    输入命令快速跳转到页面内容或切换主题
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOutputs([])}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    清空
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="size-7 hover:bg-muted/60"
                    aria-label="关闭快捷命令面板"
                  >
                    <X />
                  </Button>
                </div>
              </div>

              {/* 输出区域 */}
              <div className="flex-1 space-y-3 overflow-y-auto px-4 pt-3 pb-2">
                {outputs.length === 0 && (
                  <div className="text-muted-foreground/80 space-y-1 text-xs">
                    <p>
                      试试 <span className="font-mono text-foreground">go skills</span>、
                      <span className="font-mono text-foreground">open github</span> 或
                      <span className="font-mono text-foreground">theme dark</span>
                    </p>
                    <p className="text-muted-foreground/60">输入 help 查看全部命令。</p>
                  </div>
                )}

                {outputs.map((item, index) => (
                  <div key={index} className="space-y-1">
                    {item.command && (
                      <div className="text-muted-foreground/70 flex items-center gap-2 text-xs">
                        <span className="font-mono">{">"}</span>
                        <span className="font-mono">{item.command}</span>
                      </div>
                    )}
                    {item.output && (
                      <div
                        className={cn(
                          "text-sm",
                          item.output.type === "error" && "text-red-400",
                          item.output.type === "success" && "text-emerald-400",
                          item.output.type === "code" && "font-mono text-[13px]",
                          item.output.type === "text" && "text-muted-foreground",
                        )}
                      >
                        {item.output.content}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={outputsEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="border-border/50 bg-background/90 border-t p-4">
                <div className="border-border bg-card flex items-center gap-2 rounded-xl border px-3 py-2 shadow-sm">
                  <Command className="text-muted-foreground size-4 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="输入命令或页面名称"
                    aria-label="命令输入"
                    className="placeholder:text-muted-foreground/60 flex-1 border-none bg-transparent text-sm outline-none"
                    autoFocus
                  />
                  <span className="text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                    Enter
                  </span>
                </div>

                {/* 建议 */}
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {suggestions.map((cmd, index) => (
                      <button
                        key={cmd.name}
                        onClick={() => executeCommand(cmd.name)}
                        className={cn(
                          "bg-card text-foreground flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-left transition-colors hover:border-foreground/20 hover:bg-muted/70",
                          index === 0 && "ring-1 ring-blue-500/50",
                        )}
                      >
                        <span className="font-mono text-xs font-medium text-foreground">
                          {cmd.name}
                        </span>
                        <span className="text-muted-foreground text-xs">{cmd.description}</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 提示 */}
                <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-3 text-xs">
                  <span>
                    <kbd className="bg-muted rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                      Enter
                    </kbd>{" "}
                    执行命令
                  </span>
                  <span>
                    <kbd className="bg-muted rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                      Tab
                    </kbd>{" "}
                    自动补全
                  </span>
                  <span>
                    <kbd className="bg-muted rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    历史命令
                  </span>
                  <span>
                    <kbd className="bg-muted rounded-md border px-1.5 py-0.5 font-mono text-[10px]">
                      /
                    </kbd>{" "}
                    打开面板
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
