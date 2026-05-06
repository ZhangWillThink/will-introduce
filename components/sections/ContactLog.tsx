"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { FaGithub as Github } from "react-icons/fa6";

import { TerminalWindow } from "@/components/layout/TerminalWindow";

interface ContactItem {
  label: string;
  value: string;
  href?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
}

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "zwillthink@163.com",
    href: "mailto:zwillthink@163.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "19231172850",
    href: "tel:19231172850",
    Icon: Phone,
  },
  {
    label: "GitHub",
    value: "@ZhangWillThink",
    href: "https://github.com/ZhangWillThink",
    Icon: Github,
  },
  {
    label: "Location",
    value: "北京市朝阳区",
    Icon: MapPin,
  },
];

export function ContactLog() {
  return (
    <TerminalWindow title="Reachable" filename="04 / CONTACT" delay={0.6}>
      <div className="p-4 sm:p-5">
        <dl className="grid gap-3 sm:grid-cols-[minmax(0,132px)_1fr] sm:gap-x-5 sm:gap-y-4">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.08, duration: 0.25 }}
              className="grid gap-1 border-b border-border/40 pb-3 last:border-b-0 last:pb-0 sm:col-span-2 sm:grid-cols-subgrid"
            >
              <dt className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                <item.Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </dt>
              <dd className="text-sm text-foreground sm:text-[15px]">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-5 grid gap-3 border-t border-border/50 pt-4 sm:grid-cols-[minmax(0,132px)_1fr] sm:gap-x-5">
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">当前状态</p>
          <p className="text-sm text-foreground">离职，可快速到岗</p>
        </div>
      </div>
    </TerminalWindow>
  );
}
