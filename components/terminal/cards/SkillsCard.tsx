import { TerminalCard } from "./TerminalCard";

interface SkillsCardProps {
  onClose: () => void;
}

const skills = [
  { name: "React", level: 85, color: "from-blue-500 to-cyan-400" },
  { name: "Vue 3", level: 80, color: "from-emerald-500 to-green-400" },
  { name: "Node.js", level: 75, color: "from-green-500 to-emerald-400" },
  { name: "GSAP", level: 88, color: "from-violet-500 to-purple-400" },
  { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
  { name: "AI/LLM", level: 72, color: "from-orange-500 to-amber-400" },
];

export function SkillsCard({ onClose }: SkillsCardProps) {
  return (
    <TerminalCard title="skills.json" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">技术栈熟练度评估</p>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{skill.name}</span>
                <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
              </div>
              <div className="bg-muted/50 h-2 overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
