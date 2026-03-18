import { TerminalCard } from "./TerminalCard";
import { getCommandList } from "../CommandProcessor";

interface HelpCardProps {
  onClose: () => void;
}

export function HelpCard({ onClose }: HelpCardProps) {
  const commands = getCommandList();
  const categories = ["navigation", "info", "action", "system"];
  const categoryNames: Record<string, string> = {
    navigation: "导航",
    info: "信息",
    action: "操作",
    system: "系统",
  };

  return (
    <TerminalCard title="help.txt" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">可用命令列表</p>

        {categories.map((cat) => {
          const catCommands = commands.filter((c) => {
            if (cat === "navigation") return ["help"].includes(c.name);
            if (cat === "info")
              return ["about", "skills", "projects", "focus", "contact"].includes(c.name);
            if (cat === "action") return ["theme"].includes(c.name);
            if (cat === "system") return ["clear", "exit"].includes(c.name);
            return false;
          });

          if (catCommands.length === 0) return null;

          return (
            <div key={cat}>
              <h3 className="text-primary mb-2 text-xs font-medium tracking-wider uppercase">
                {categoryNames[cat]}
              </h3>
              <div className="space-y-2">
                {catCommands.map((cmd) => (
                  <div key={cmd.name} className="flex items-start gap-3">
                    <span className="min-w-[80px] font-mono text-sm text-emerald-400">
                      {cmd.name}
                    </span>
                    <span className="text-muted-foreground text-sm">{cmd.description}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="border-border/50 text-muted-foreground border-t pt-4 text-xs">
          <p>快捷键：</p>
          <ul className="mt-1 space-y-1">
            <li>
              • <kbd className="bg-muted rounded px-1 py-0.5 font-mono">~</kbd> 进入终端模式
            </li>
            <li>
              • <kbd className="bg-muted rounded px-1 py-0.5 font-mono">ESC</kbd> 返回 / 退出
            </li>
            <li>
              • <kbd className="bg-muted rounded px-1 py-0.5 font-mono">Tab</kbd> 命令补全
            </li>
            <li>
              • <kbd className="bg-muted rounded px-1 py-0.5 font-mono">↑↓</kbd> 浏览历史
            </li>
          </ul>
        </div>
      </div>
    </TerminalCard>
  );
}
