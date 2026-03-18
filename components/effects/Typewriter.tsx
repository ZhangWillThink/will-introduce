"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  lines: string[];
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export function Typewriter({ lines, delay = 500, speed = 50, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initial delay before typing starts
    const initialDelay = setTimeout(() => {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          // Type next character
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + lines[currentLine][currentChar]);
            setCurrentChar((prev) => prev + 1);
          }, speed);
          return () => clearTimeout(timeout);
        } else {
          // Line complete, move to next line
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + "\n");
            setCurrentLine((prev) => prev + 1);
            setCurrentChar(0);
          }, 150);
          return () => clearTimeout(timeout);
        }
      } else {
        // All lines complete
        if (!isComplete) {
          setIsComplete(true);
          onComplete?.();
        }
      }
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [currentLine, currentChar, lines, delay, speed, isComplete, onComplete]);

  return <pre className="font-mono text-sm break-words whitespace-pre-wrap">{displayedText}</pre>;
}
