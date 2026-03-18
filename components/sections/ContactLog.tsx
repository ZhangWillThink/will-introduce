"use client";

import { motion } from "framer-motion";
import { Mail, Github, MapPin, CircleCheck } from "lucide-react";
import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { Badge } from "@/components/ui/badge";

export function ContactLog() {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "zwillthink@outlook.com",
      href: "mailto:zwillthink@outlook.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@ZhangWillThink",
      href: "https://github.com/ZhangWillThink",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Beijing, CN",
      href: undefined,
    },
  ];

  return (
    <TerminalWindow title="Contact" filename="system_log.txt" delay={0.6}>
      <div className="p-4 sm:p-5">
        {/* Contact List */}
        <div className="flex flex-col gap-3">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {/* Icon */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                <item.icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground text-sm font-medium">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div className="border-border/50 bg-card/30 mt-4 flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted-foreground text-xs">Current Status</span>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <CircleCheck className="mr-1 h-3 w-3" />
            Available
          </Badge>
        </div>

        {/* Call to Action */}
        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
          有合作意向或技术讨论？欢迎随时联系。
        </p>
      </div>
    </TerminalWindow>
  );
}
