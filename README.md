# will-introduce

个人介绍页（单页站点）：Nuxt 4 + [Nuxt UI](https://ui.nuxt.com) v4 + Tailwind CSS v4。默认部署在 Vercel。

## 技术栈

- **框架**：Nuxt 4
- **UI**：Nuxt UI v4（含 `@nuxtjs/color-mode`，头部使用 `UColorModeSelect`）
- **样式**：Tailwind v4（配置在 `app/assets/css/main.css` 的 `@theme`，无根目录 `tailwind.config.ts`）
- **动效**：GSAP + ScrollTrigger（见 `app/pages/index.vue`，客户端动态加载）

## 必备工具

使用 **pnpm**（`package.json` 中 `packageManager` 固定为 `pnpm@10.33.3`）。

```bash
pnpm install
```

## 常用命令

| 命令                          | 说明                                                |
| ----------------------------- | --------------------------------------------------- |
| `pnpm dev`                    | 开发服务器，通常为 http://localhost:3000            |
| `pnpm build`                  | 生产构建                                            |
| `pnpm preview`                | 本地预览生产构建                                    |
| `pnpm lint` / `pnpm lint:fix` | oxlint（与 CI 一致；`lint:fix` 可自动修复部分问题） |
| `pnpm fmt` / `pnpm fmt:check` | oxfmt 格式化 / 仅检查                               |
| `pnpm typecheck`              | `nuxt typecheck`（vue-tsc）                         |

CI（`.github/workflows/ci.yml`）在 Node 22 上运行 `pnpm run lint` 与 `pnpm run typecheck`，不包含 `build`（构建在部署阶段完成）。

## 目录与定制

| 路径                      | 用途                                             |
| ------------------------- | ------------------------------------------------ |
| `app/pages/index.vue`     | 唯一页面：Hero、技能、项目、能力等区块           |
| `app/config/site.ts`      | 站点文案、导航、`siteUrl` / 邮箱 / GitHub 等外链 |
| `app/assets/css/main.css` | Tailwind 入口、`@theme`、`.hero-gradient`        |
| `app/app.config.ts`       | Nuxt UI 主题（如 `primary: 'green'`）            |
| `design/design.pen`       | Pencil 设计稿（桌面/移动 × 明暗）                |
| `Resume.md`               | 页面内容的文字参考                               |

源码根目录为 **`app/`**，不是根目录下的 `pages/` 或 `src/`。

更细的约定、陷阱与 CI 说明见仓库根目录 **[AGENTS.md](./AGENTS.md)**（面向自动化助手与协作者）。

## 参考链接

- [Nuxt 文档](https://nuxt.com/docs)
- [Nuxt UI 文档](https://ui.nuxt.com/docs/getting-started/installation/nuxt)
- [部署说明](https://nuxt.com/docs/getting-started/deployment)
