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
      }, shouldReduceMotion ? 220 : 480)

      previousThemeRef.current = theme

      return () => window.clearTimeout(timer)
    }

    previousThemeRef.current = theme
  }, [shouldReduceMotion, theme])

  const isDark = resolvedTheme === 'dark'
  const palette = isDark
    ? {
        ambient:
          'radial-gradient(90% 72% at 82% 10%, rgba(96, 165, 250, 0.14) 0%, rgba(129, 140, 248, 0.08) 30%, transparent 62%), linear-gradient(180deg, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0.04) 46%, transparent 100%)',
        sheen:
          'linear-gradient(115deg, transparent 18%, rgba(148, 163, 184, 0.08) 44%, rgba(96, 165, 250, 0.12) 56%, transparent 82%)',
        bloom:
          'radial-gradient(circle, rgba(96, 165, 250, 0.28) 0%, rgba(129, 140, 248, 0.12) 42%, transparent 74%)',
        sheenOpacity: shouldReduceMotion ? 0.06 : 0.12,
        bloomOpacity: shouldReduceMotion ? 0.1 : 0.18,
      }
    : {
        ambient:
          'radial-gradient(90% 72% at 82% 10%, rgba(251, 191, 36, 0.12) 0%, rgba(244, 114, 182, 0.06) 30%, transparent 62%), linear-gradient(180deg, rgba(255, 251, 235, 0.28) 0%, rgba(255, 247, 237, 0.08) 46%, transparent 100%)',
        sheen:
          'linear-gradient(115deg, transparent 18%, rgba(255, 255, 255, 0.1) 44%, rgba(251, 191, 36, 0.14) 56%, transparent 82%)',
        bloom:
          'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(244, 114, 182, 0.08) 42%, transparent 74%)',
        sheenOpacity: shouldReduceMotion ? 0.06 : 0.1,
        bloomOpacity: shouldReduceMotion ? 0.08 : 0.16,
      }

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
          className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
          aria-hidden="true"
          >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: shouldReduceMotion ? 0.16 : 0.28,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.22,
                ease: exitEase,
              },
            }}
            className="absolute inset-0"
            style={{ background: palette.ambient }}
          />

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 26,
              y: shouldReduceMotion ? 0 : -10,
              scale: shouldReduceMotion ? 1 : 0.96,
            }}
            animate={{
              opacity: palette.sheenOpacity,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.18 : 0.42,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -12,
              y: shouldReduceMotion ? 0 : 10,
              scale: shouldReduceMotion ? 1 : 1.02,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.24,
                ease: exitEase,
              },
            }}
            className="absolute -top-14 right-[-10vw] h-48 w-[58vw] max-w-xl rotate-[-14deg] blur-2xl sm:h-56"
            style={{ background: palette.sheen }}
          />

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 18,
              y: shouldReduceMotion ? 0 : -16,
              scale: shouldReduceMotion ? 1 : 0.9,
            }}
            animate={{
              opacity: palette.bloomOpacity,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.2 : 0.38,
                ease: enterEase,
              },
            }}
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -10,
              y: shouldReduceMotion ? 0 : 12,
              scale: shouldReduceMotion ? 1 : 1.04,
              transition: {
                duration: shouldReduceMotion ? 0.14 : 0.24,
                ease: exitEase,
              },
            }}
            className="absolute -top-12 -right-8 h-44 w-44 rounded-full blur-3xl sm:h-52 sm:w-52"
            style={{ background: palette.bloom }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
