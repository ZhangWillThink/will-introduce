"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="theme-footer border-t border-border/80"
    >
      <div className="theme-frame flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 text-[11px]">
        <span>© {currentYear} Will Zhang</span>
        <div className="flex items-center gap-3 uppercase tracking-[0.16em]">
          <span>Frontend</span>
          <span>/</span>
          <span>AI</span>
          <span>/</span>
          <span>Beijing</span>
        </div>
      </div>
    </motion.footer>
  );
}
