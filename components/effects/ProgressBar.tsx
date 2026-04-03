"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  showPercentage?: boolean;
  color?: "blue" | "violet" | "emerald" | "amber";
}

export function ProgressBar({
  value,
  showPercentage = false,
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
        <div className="bg-border/80 relative h-[2px] flex-1 overflow-hidden">
          <motion.div style={{ width: widthPercent }} className={cn("h-full transition-all duration-300", colorClasses[color])} />
        </div>

        {showPercentage && (
          <motion.span className="text-muted-foreground min-w-[40px] text-right font-mono text-xs">
            {displayValue}
          </motion.span>
        )}
    </div>
  );
}
