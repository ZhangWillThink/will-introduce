import { TerminalCard } from "./TerminalCard";
import { Folder } from "lucide-react";

interface ProjectsCardProps {
  onClose: () => void;
}

const projects = [
  {
    name: "corporate-site",
    tech: ["GSAP", "React"],
    description: "高质量动画交互，品牌展示站点",
    color: "border-blue-500",
  },
  {
    name: "ai-video-library",
    tech: ["Node.js", "Vector Search"],
    description: "语义检索 + 向量搜索，智能标签匹配",
    color: "border-violet-500",
  },
];

export function ProjectsCard({ onClose }: ProjectsCardProps) {
  return (
    <TerminalCard title="projects/" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">精选项目展示</p>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`group border-l-2 ${project.color} bg-card/30 hover:bg-card/50 p-4 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <Folder className="mt-0.5 h-5 w-5 text-emerald-400" />
                <div className="flex-1">
                  <h3 className="font-mono text-sm text-emerald-400">{project.name}/</h3>
                  <p className="text-foreground mt-1 text-sm">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-muted/50 text-muted-foreground rounded px-2 py-0.5 font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
