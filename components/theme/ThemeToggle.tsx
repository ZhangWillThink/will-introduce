"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-8 w-8 overflow-hidden hover:bg-blue-500/10"
      aria-label="切换主题"
    >
      {/* Background pulse effect */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20"
      />

      {/* Sun icon */}
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: theme === "dark" ? 90 : 0, scale: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        <Sun className="h-4 w-4" />
      </motion.div>

      {/* Moon icon */}
      <motion.div
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: theme === "dark" ? 0 : 90, scale: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
    </Button>
  );
}
