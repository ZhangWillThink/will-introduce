'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from 'next-themes'

const enterEase = [0.16, 1, 0.3, 1] as const
const exitEase = [0.7, 0, 0.84, 0] as const

export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const previousThemeRef = useRef<string | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (previousThemeRef.current !== undefined && previousThemeRef.current !== theme) {
      setIsTransitioning(true)

      const timer = window.setTimeout(() => {
        setIsTransitioning(false)
      }, shouldReduceMotion ? 180 : 360)

      previousThemeRef.current = theme

      return () => window.clearTimeout(timer)
    }

    previousThemeRef.current = theme
  }, [shouldReduceMotion, theme])

  const isDark = resolvedTheme === 'dark'

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: shouldReduceMotion ? 0.14 : 0.22,
              ease: enterEase,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0.12 : 0.18,
              ease: exitEase,
            },
          }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.24,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: shouldReduceMotion ? 0.12 : 0.18,
                ease: exitEase,
              },
            }}
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.14) 0%, rgba(15, 23, 42, 0.05) 48%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(255, 251, 235, 0.34) 0%, rgba(255, 247, 237, 0.1) 48%, transparent 100%)',
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.92,
            }}
            animate={{
              opacity: shouldReduceMotion ? 0.12 : 0.2,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.16 : 0.34,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.04,
              transition: {
                duration: shouldReduceMotion ? 0.12 : 0.2,
                ease: exitEase,
              },
            }}
            className="absolute -top-10 right-[-2.5rem] h-40 w-40 rounded-full blur-3xl sm:h-48 sm:w-48"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(96, 165, 250, 0.32) 0%, rgba(129, 140, 248, 0.14) 42%, transparent 74%)'
                : 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(244, 114, 182, 0.08) 42%, transparent 74%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
