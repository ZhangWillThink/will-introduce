import { TerminalCard } from "./TerminalCard";
import { Mail, Github, MapPin } from "lucide-react";

interface ContactCardProps {
  onClose: () => void;
}

export function ContactCard({ onClose }: ContactCardProps) {
  return (
    <TerminalCard title="contact.log" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">联系方式与社交链接</p>

        <div className="space-y-4 font-mono text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">Email:</span>
              <a
                href="mailto:zwillthink@outlook.com"
                className="ml-2 text-emerald-400 hover:underline"
              >
                zwillthink@outlook.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">GitHub:</span>
              <a
                href="https://github.com/ZhangWillThink"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-emerald-400 hover:underline"
              >
                @ZhangWillThink
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground ml-2">Beijing, CN</span>
            </div>
          </div>
        </div>

        <div className="border-border/50 border-t pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-emerald-400">Online & Available for opportunities</span>
          </div>
        </div>
      </div>
    </TerminalCard>
  );
}
