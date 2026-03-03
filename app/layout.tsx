import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

// ⚠️ 部署后将此处替换为真实域名
const siteUrl = 'https://willzhang.dev'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  // metadataBase 让相对路径的 OG image 等资源自动拼上域名
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Will Zhang — 前端工程师',
    // 子页面会渲染为 "页面名 | Will Zhang"
    template: '%s | Will Zhang',
  },
  description: '具备全栈能力的前端工程师，擅长 GSAP 动画交互与 AI 功能开发，以技术驱动产品体验。',
  keywords: ['前端工程师', 'React', 'Vue', 'GSAP', 'TypeScript', 'Node.js', 'AI', '全栈开发'],
  authors: [{ name: 'Will Zhang', url: siteUrl }],
  creator: 'Will Zhang',

  // 告知爬虫可索引、可跟踪链接，并允许搜索结果展示大图预览
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 规范化 URL，避免重复内容问题
  alternates: {
    canonical: siteUrl,
  },

  // Open Graph — 控制分享到微信、飞书、Slack 等时的卡片样式
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    siteName: 'Will Zhang',
    title: 'Will Zhang — 前端工程师',
    description: '具备全栈能力的前端工程师，擅长 GSAP 动画交互与 AI 功能开发，以技术驱动产品体验。',
    images: [
      {
        url: '/og.png', // 由 app/opengraph-image.tsx 构建时生成
        width: 1200,
        height: 630,
        alt: 'Will Zhang — 前端工程师',
      },
    ],
  },

  // Twitter / X 卡片
  twitter: {
    card: 'summary_large_image',
    title: 'Will Zhang — 前端工程师',
    description: '具备全栈能力的前端工程师，擅长 GSAP 动画交互与 AI 功能开发，以技术驱动产品体验。',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
