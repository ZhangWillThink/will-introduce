# 「赛博控制台」个人网站设计文档

**创建日期**: 2026-03-16
**版本**: 1.0
**状态**: 已批准

---

## 1. 项目概述

### 1.1 设计目标

重新设计个人Portfolio 网站，采用「赛博控制台」主题，打造强烈的技术感和视觉冲击力，同时兼顾求职、获客和技术影响力多种场景。

### 1.2 核心需求

| 维度 | 决策 |
|------|------|
| 设计范围 | 视觉 + 内容全面重新设计 |
| 目标受众 | 混合场景（招聘方、客户、技术社区） |
| 设计风格 | 科技感强，支持深色/浅色主题 |
| 核心突出 | 技能专长 + 技术深度 |
| 动画效果 | 丰富炫技，充分展示技术能力 |
| 技术栈 | 保持现有（Next.js + React + TS + Tailwind + shadcn） |
| 内容 | 使用现有内容重新设计 |
| 性能/SEO | 极致优化（Lighthouse 95+） |

---

## 2. 设计概念

### 2.1 核心隐喻

将整个网站设计成一个**未来感的开发者控制台**界面，访问者如同在操作一个高科技终端系统。

### 2.2 设计原则

1. **技术感优先** - 所有视觉元素服务于"终端/IDE"主题
2. **动画即内容** - 动画不只是装饰，而是信息传达的一部分
3. **主题对等** - 深色/浅色主题视觉权重相等，非简单反色
4. **性能约束** - 炫技不以牺牲性能为代价

---

## 3. 信息架构

### 3.1 布局结构

```
┌─────────────────────────────────────────────┐
│  STATUS BAR [Logo/姓名/状态/主题切换]        │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │  HERO       │  │   SKILLS GRID       │   │
│  │  终端窗口   │  │   技能矩阵窗口      │   │
│  │             │  │                     │   │
│  └─────────────┘  └─────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │   PROJECTS / DEEP Dive             │    │
│  │   项目与技术深度窗口               │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │  FOCUS      │  │   CONTACT / LOG     │   │
│  │  当前研究   │  │   联系/运行日志     │   │
│  └─────────────┘  └─────────────────────┘   │
├─────────────────────────────────────────────┤
│  > 输入命令导航 (按 / 唤起) [可折叠]         │
└─────────────────────────────────────────────┘
```

### 3.2 响应式断点

| 断点 | 布局策略 |
|------|----------|
| `< 640px` | 单列堆叠，命令栏常驻底部 |
| `640-1024px` | 双列布局，窗口适当缩小 |
| `> 1024px` | 完整双列布局，最大化利用空间 |

---

## 4. 视觉设计

### 4.1 色彩系统

#### 深色主题（夜间终端模式）

| 用途 | Token | 值 |
|------|-------|-----|
| 背景主色 | `--background` | `#0D0D14` |
| 背景次色 | `--card` | `#12121F` |
| 主强调色 | `--primary` | `#3B82F6` |
| 次强调色 | `--accent` | `#8B5CF6` |
| 成功状态 | `--success` | `#10B981` |
| 警告状态 | `--warning` | `#F59E0B` |
| 错误状态 | `--error` | `#EF4444` |
| 文本主色 | `--foreground` | `#F1F5F9` |
| 文本次色 | `--muted-foreground` | `#94A3B8` |
| 边框色 | `--border` | `rgba(148,163,184,0.15)` |

#### 浅色主题（日间 IDE 模式）

| 用途 | Token | 值 |
|------|-------|-----|
| 背景主色 | `--background` | `#F5F5F7` |
| 背景次色 | `--card` | `#FFFFFF` |
| 主强调色 | `--primary` | `#2563EB` |
| 次强调色 | `--accent` | `#7C3AED` |
| 成功状态 | `--success` | `#059669` |
| 警告状态 | `--warning` | `#D97706` |
| 错误状态 | `--error` | `#DC2626` |
| 文本主色 | `--foreground` | `#0F172A` |
| 文本次色 | `--muted-foreground` | `#475569` |
| 边框色 | `--border` | `rgba(0,0,0,0.12)` |

### 4.2 字体系统

| 用途 | 字体 | 字重 | 备注 |
|------|------|------|------|
| 正文 | Geist Sans | 400/500 | 现代无衬线 |
| 代码/术语 | Geist Mono | 400/500 | 等宽字体 |
| 大标题 | Geist Sans | 800 | + 渐变效果 |
| 窗口标题 | Geist Mono | 500 | 小写 + 字母间距 |

### 4.3 窗口容器规范

```css
.terminal-window {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 85%, transparent);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.terminal-window:hover {
  border-color: color-mix(in srgb, var(--primary) 40%, var(--border));
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
    0 8px 32px color-mix(in srgb, var(--primary) 15%, transparent);
  transform: translateY(-2px);
}
```

### 4.4 窗口标题栏

```
┌─ ❌ ─ ● ─ □ ────────────────────────────┐
│ > filename.ext                           │
└──────────────────────────────────────────┘
```

- 三点按钮：红 (❌) 关闭 / 黄 (●) 最小化 / 绿 (□) 最大化
- 文件名：等宽字体，显示当前"文件"名称
- 悬停时三点按钮有微光效果

---

## 5. 组件设计

### 5.1 StatusBar（顶部状态栏）

**结构**:
```tsx
<StatusBar>
  <StatusBarLeft>
    <Logo>W</Logo>
    <Name>Will Zhang</Name>
    <Badge>FRONTEND ENGINEER</Badge>
  </StatusBarLeft>
  <StatusBarCenter>
    <StatusIndicator color="emerald" label="Available" />
  </StatusBarCenter>
  <StatusBarRight>
    <ThemeToggle />
    <ContactButton />
  </StatusBarRight>
</StatusBar>
```

**交互**:
- 状态灯持续呼吸动画
- 按钮悬停时背光高亮
- 点击主题切换按钮有旋转动画

### 5.2 TerminalWindow（终端窗口容器）

**Props**:
```tsx
interface TerminalWindowProps {
  title: string;           // 窗口标题
  filename?: string;       // 显示的文件名（可选）
  children: React.ReactNode;
  className?: string;
  delay?: number;          // 入场动画延迟
}
```

**特性**:
- 可折叠（标题栏双击）
- 悬停辉光效果
- 入场动画（滑落 + 淡入）

### 5.3 HeroTerminal（Hero 区域）

**内容结构**:
```tsx
<HeroTerminal>
  <TerminalHeader />
  <TerminalBody>
    <Typewriter lines={[
      "$ cat will_zhang.txt",
      "> FRONTEND ENGINEER",
      "> Full-Stack Capable",
      "",
      "具备全栈能力的前端工程师，擅长...",
    ]} />
    <SkillBadges tags={["React", "Vue", "Node.js", "GSAP", "AI"]} />
    <Cursor blink />
  </TerminalBody>
</HeroTerminal>
```

**动画**:
- 窗口滑落入场（GSAP）
- 打字机逐行输出（自定义 Hook）
- 光标持续闪烁
- 技能标签依次浮现

### 5.4 SkillsMatrix（技能矩阵）

**视觉样式**:
```
[React]    ████████████████░░  85%
[Vue 3]    ███████████████░░░  80%
[Node.js]  ██████████████░░░░  75%
[GSAP]     ████████████████░░  88%
[TS]       █████████████████░  90%
[AI/LLM]   ██████████████░░░░  72%
```

**交互**:
- 进入视口时进度条从 0 增长
- 悬停技能条弹出详情卡片
- 技能图标有微动效

**数据结构**:
```tsx
const skills = [
  { name: 'React', icon: Atom, level: 0.85, projects: ['企业官网', 'AI 视频库'] },
  { name: 'Vue 3', icon: Layers, level: 0.80, projects: [...] },
  { name: 'Node.js', icon: Server, level: 0.75, projects: [...] },
  { name: 'GSAP', icon: Wand2, level: 0.88, projects: [...] },
  { name: 'TypeScript', icon: Braces, level: 0.90, projects: [...] },
  { name: 'AI/LLM', icon: Sparkles, level: 0.72, projects: [...] },
];
```

### 5.5 ProjectsList（项目列表）

**视觉样式**:
```
📁 corporate-site/
   └─ GSAP · React · 企业官网
      高质量动画交互，品牌展示站点
      [查看源码] [在线演示]

📁 ai-video-library/
   └─ Node.js · Vector Search · AI
      语义检索 + 向量搜索，智能标签匹配
      [查看源码] [在线演示]
```

**交互**:
- 文件夹图标悬停晃动
- 点击展开/收起详情
- 按钮有终端风格边框

### 5.6 FocusAreas（研究方向）

**内容**:
- 官网体验升级
- AI 功能产品化
- Cloudflare 边缘部署
- 性能与可观测性

**样式**: Markdown 风格渲染，代码块带语法高亮

### 5.7 ContactLog（联系/运行日志）

**概念**: 将联系方式包装成"系统日志"格式

```
[SYSTEM LOG]
> Email: zwillthink@outlook.com
> GitHub: @ZhangWillThink
> Location: Beijing, CN
> Status: Online & Available
```

### 5.8 CommandBar（命令输入区）

**支持命令**:
```
help        - 显示帮助信息
about       - 查看个人信息
skills      - 查看技能列表
projects    - 查看项目
focus       - 查看研究方向
contact     - 联系方式
theme       - 切换主题
clear       - 清屏
```

**交互**:
- 按 `/` 键展开
- Tab 键命令补全
- 回车执行 + 跳转
- 支持命令历史（↑↓切换）

---

## 6. 动画效果清单

### 6.1 入场动画序列

```
Timeline (总时长 ~2000ms):
├─ 0ms:    StatusBar 下滑入场
├─ 200ms:  Hero 窗口滑落
├─ 400ms:  打字机开始输出
├─ 800ms:  Skills 窗口浮现
├─ 1000ms: Skills 进度条开始增长
├─ 1300ms: Projects 窗口浮现
├─ 1500ms: Focus/Contact 窗口浮现
└─ 1800ms: CommandBar 提示闪现
```

### 6.2 持续动画

| 元素 | 动画 | 时长 |
|------|------|------|
| 状态灯 | 呼吸（opacity 0.6→1） | 2s infinite |
| 光标 | 闪烁（opacity 0→1） | 1s infinite |
|  floating 元素 | 上下浮动 | 14s infinite |
| 窗口辉光 | 脉冲 | 3s infinite |

### 6.3 交交互动画

| 交互 | 动画 |
|------|------|
| 悬停窗口 | 边框辉光 + 上浮 2px + 阴影加深 |
| 点击按钮 | 脉冲波纹 + 颜色闪变 |
| 技能条增长 | width 0% → target% |
| 文件夹展开 | 旋转 + 高度展开 + 子项淡入 |
| 主题切换 | 色彩插值 300ms + 图标旋转 |

---

## 7. 主题切换实现

### 7.1 CSS 变量定义

```css
:root {
  /* 浅色主题默认值 */
  --background: #F5F5F7;
  --foreground: #0F172A;
  /* ... 其他变量 */
}

.dark {
  /* 深色主题覆盖值 */
  --background: #0D0D14;
  --foreground: #F1F5F9;
  /* ... 其他变量 */
}
```

### 7.2 next-themes 配置

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
>
```

### 7.3 切换动画

```css
* {
  transition-property: background-color, border-color, color;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 8. 性能优化策略

### 8.1 代码层面

- [ ] 组件懒加载（`React.lazy` + `Suspense`）
- [ ] 动画库按需引入（GSAP 核心 + 插件）
- [ ] 图片/图标 SVG 内联
- [ ] 使用 `will-change` 提示浏览器
- [ ] 避免布局抖动（使用 `transform` 代替 `top/left`）

### 8.2 资源优化

- [ ] 字体子集化（仅加载常用字符）
- [ ] CSS 压缩 + 关键 CSS 内联
- [ ] JS 代码分割 + Tree Shaking

### 8.3 动画优化

- [ ] 非首屏动画延迟触发
- [ ] `prefers-reduced-motion` 支持
- [ ] 复杂动画使用 Canvas/WebGL（如需要）

---

## 9. SEO 策略

### 9.1 结构化数据

保持现有 JSON-LD 结构化数据，确保搜索引擎正确理解个人信息。

### 9.2 语义化 HTML

- 每个窗口使用 `<section>` 标签
- 标题层级正确（`<h1>` → `<h2>` → `<h3>`）
- 命令输入区对爬虫隐藏（`aria-hidden="true"`）

### 9.3 Meta 标签

保持现有 metadata 配置：
- `title` / `description`
- `openGraph` 图片
- `twitter` 卡片
- `robots` 指令
- `alternates` 规范化 URL

### 9.4 性能指标目标

| 指标 | 目标值 |
|------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | 95+ |

---

## 10. 文件结构

```
app/
├── layout.tsx              # 根布局
├── page.tsx                # 主页面（重写）
├── globals.css             # 全局样式
└── components/
    ├── layout/
    │   ├── StatusBar.tsx
    │   ├── CommandBar.tsx
    │   └── TerminalWindow.tsx
    ├── sections/
    │   ├── HeroTerminal.tsx
    │   ├── SkillsMatrix.tsx
    │   ├── ProjectsList.tsx
    │   ├── FocusAreas.tsx
    │   └── ContactLog.tsx
    ├── effects/
    │   ├── Typewriter.tsx
    │   ├── ProgressBar.tsx
    │   ├── GlowingBorder.tsx
    │   └── Cursor.tsx
    ├── theme/
    │   └── ThemeToggle.tsx
    └── hooks/
        ├── useTypewriter.ts
        ├── useScrollAnimation.ts
        └── useCommandHistory.ts
```

---

## 11. 实施计划

### Phase 1 - 基础架构
- [ ] 创建 TerminalWindow 容器组件
- [ ] 实现 StatusBar 状态栏
- [ ] 设置主题切换系统
- [ ] 创建 globals.css 终端主题变量

### Phase 2 - Hero 区域
- [ ] 实现 Typewriter 打字机组件
- [ ] 创建 Cursor 光标组件
- [ ] 完成 HeroTerminal 整合

### Phase 3 - Skills 矩阵
- [ ] 实现 ProgressBar 进度条
- [ ] 创建 SkillsMatrix 组件
- [ ] 添加悬停详情卡片

### Phase 4 - Projects 列表
- [ ] 实现文件夹展开动画
- [ ] 创建 ProjectsList 组件
- [ ] 添加项目详情模态框（可选）

### Phase 5 - Focus/Contact
- [ ] 实现 FocusAreas Markdown 渲染
- [ ] 创建 ContactLog 组件

### Phase 6 - 命令输入区
- [ ] 实现 CommandBar 组件
- [ ] 添加命令补全逻辑
- [ ] 实现导航跳转功能

### Phase 7 - 优化与测试
- [ ] 性能测试（Lighthouse）
- [ ] SEO 验证（结构化数据测试）
- [ ] 跨浏览器测试
- [ ] 响应式测试

---

## 12. 验收标准

### 功能验收
- [ ] 所有窗口正常渲染
- [ ] 主题切换工作正常
- [ ] 命令输入区可正常导航
- [ ] 所有动画流畅无卡顿

### 视觉验收
- [ ] 深色/浅色主题符合设计规范
- [ ] 窗口布局在不同断点下正确响应
- [ ] 动画效果与设计文档一致

### 性能验收
- [ ] Lighthouse 分数 ≥ 95
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] 动画 60fps

### SEO 验收
- [ ] 结构化数据验证通过
- [ ] 所有 meta 标签正确
- [ ] sitemap 正常生成

---

## 13. 参考资料

- [GSAP 文档](https://greensock.com/docs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Web Vitals](https://web.dev/vitals/)
