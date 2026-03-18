import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物为 HTML/CSS/JS，可直接部署到
  // Cloudflare Pages、GitHub Pages 等任意静态托管
  output: "export",

  // 生产环境去掉 X-Powered-By: Next.js 响应头
  poweredByHeader: false,

  // 严格模式：在开发期提前暴露副作用和 deprecated API 问题
  reactStrictMode: true,

  experimental: {
    // 对大型图标库和 Radix UI 做按需 barrel 优化，防止未使用的模块打入 bundle
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },
};

export default nextConfig;
