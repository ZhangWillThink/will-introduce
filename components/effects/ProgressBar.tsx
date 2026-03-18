"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  showPercentage?: boolean;
  color?: "blue" | "violet" | "emerald" | "amber";
}

export function ProgressBar({
  value,
  label,
  icon,
  showPercentage = true,
  color = "blue",
}: ProgressBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const widthPercent = useTransform(springValue, (latest) => `${Math.round(latest * 100)}%`);
  const displayValue = useTransform(springValue, (latest) => `${Math.round(latest * 100)}%`);

  const colorClasses = {
    blue: "bg-blue-500 dark:bg-blue-400",
    violet: "bg-violet-500 dark:bg-violet-400",
    emerald: "bg-emerald-500 dark:bg-emerald-400",
    amber: "bg-amber-500 dark:bg-amber-400",
  };

  return (
    <div ref={ref} className="flex items-center gap-3 py-1.5">
      {/* Icon */}
      {icon && (
        <span className="text-muted-foreground flex h-5 w-5 items-center justify-center">
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="min-w-[80px] font-mono text-sm font-medium">{label}</span>

      {/* Bar Container */}
      <div className="bg-muted/50 relative flex-1 overflow-hidden rounded-full">
        {/* Fill */}
        <motion.div
          style={{ width: widthPercent }}
          className={cn("h-4 rounded-full transition-all duration-300", colorClasses[color])}
        >
          {/* Striped pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 4px,
                rgba(255,255,255,0.3) 4px,
                rgba(255,255,255,0.3) 8px
              )`,
            }}
          />
        </motion.div>
      </div>

      {/* Percentage */}
      {showPercentage && (
        <motion.span className="text-muted-foreground min-w-[40px] text-right font-mono text-xs">
          {displayValue}
        </motion.span>
      )}
    </div>
  );
}
