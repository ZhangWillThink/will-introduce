import { TerminalCard } from "./TerminalCard";

interface AboutCardProps {
  onClose: () => void;
}

export function AboutCard({ onClose }: AboutCardProps) {
  return (
    <TerminalCard title="about.md" onClose={onClose}>
      <div className="space-y-6">
        {/* ASCII Art 标题 */}
        <pre className="text-xs leading-relaxed text-primary/80 overflow-x-auto">
          {`   __      __   _
   \\ \\    / /__| | __ _ _ __
    \\ \\/\\ / _ \\ |/ _\\\` | | '_ \\
     \\ /\\  /  __/ | (_| | | | |
      \\/  \\/ \\___|_|\\__,_|_| |_|`}
        </pre>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Will Zhang</h2>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            FRONTEND ENGINEER
          </span>
        </div>

        <p className="text-sm leading-relaxed text-foreground">
          具备全栈能力的前端工程师，擅长用 GSAP 打造高质量动画交互， 同时深入 AI
          功能开发，以技术驱动产品体验。
        </p>

        <div className="flex flex-wrap gap-2">
          {["React", "Vue", "Node.js", "GSAP", "TypeScript", "AI/LLM"].map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-mono text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
