import { TerminalCard } from './TerminalCard'

interface FocusCardProps {
  onClose: () => void
}

const focusAreas = [
  { icon: '🎯', title: '官网体验升级', desc: '动画与交互深度优化' },
  { icon: '🤖', title: 'AI 功能产品化', desc: 'LLM 应用落地实践' },
  { icon: '☁️', title: 'Cloudflare 边缘部署', desc: '边缘计算与性能优化' },
  { icon: '📊', title: '性能与可观测性', desc: '监控体系与性能调优' },
]

export function FocusCard({ onClose }: FocusCardProps) {
  return (
    <TerminalCard title="focus.md" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">当前研究方向</p>

        <div className="grid gap-3">
          {focusAreas.map(area => (
            <div
              key={area.title}
              className="border-border/50 bg-card/30 hover:bg-card/50 flex items-center gap-4 rounded-lg border p-4 transition-colors"
            >
              <span className="text-2xl">{area.icon}</span>
              <div>
                <h3 className="font-medium">{area.title}</h3>
                <p className="text-muted-foreground text-sm">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  )
}
