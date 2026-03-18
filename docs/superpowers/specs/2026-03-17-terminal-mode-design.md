# 沉浸式终端模式设计文档

**创建日期**: 2026-03-17
**版本**: 1.0
**状态**: 待审查

---

## 1. 概述

### 1.1 设计目标

为「赛博控制台」个人网站增加一个全屏沉浸式终端模式，用户可以通过快捷键进入终端界面，输入命令来导航和查看内容，实现更具科技感和交互性的用户体验。

### 1.2 核心需求

| 维度     | 决策                               |
| -------- | ---------------------------------- |
| 触发方式 | `~` 键进入，ESC 或 `exit` 命令退出 |
| 呈现方式 | 终端背景淡化 + 相关内容卡片浮现    |
| 命令系统 | 简洁命令直达，无需虚拟文件系统     |
| 视觉风格 | 延续赛博控制台主题，毛玻璃效果     |
| 动画效果 | 流畅的进入/退出/内容浮现动画       |

---

## 2. 架构设计

### 2.1 模式切换流程

```
┌─────────────────┐     按 ~ 键      ┌─────────────────┐
│                 │ ──────────────► │                 │
│   正常模式       │                 │   终端模式       │
│  (多窗口布局)    │ ◄────────────── │   (命令输入)     │
│                 │   ESC / exit    │                 │
└─────────────────┘                 └────────┬────────┘
                                             │
                              输入内容命令    │
                              (projects等)   ▼
                                    ┌─────────────────┐
                                    │   混合视图       │
                                    │ (卡片浮现+终端)  │
                                    └─────────────────┘
```

### 2.2 状态机

```
                    ┌─────────────┐
                    │   Normal    │
                    │    Mode     │
                    └──────┬──────┘
                           │ ~ key
                           ▼
                    ┌─────────────┐
         ┌─────────│  Terminal   │◄────────┐
         │         │    Mode     │         │
         │ exit    └──────┬──────┘         │
         │                     │ content cmd
         │                     ▼
         │              ┌─────────────┐
         └──────────────│   Content   │
              ESC       │   Overlay   │
                        └─────────────┘
```

---

## 3. 命令系统设计

### 3.1 命令列表

| 命令       | 别名            | 功能             | 呈现方式               |
| ---------- | --------------- | ---------------- | ---------------------- |
| `help`     | `?`, `h`        | 显示所有可用命令 | 终端内 ASCII 表格      |
| `about`    | `whoami`        | 查看个人介绍     | 中央浮现 Hero 卡片     |
| `skills`   | `tech`, `stack` | 查看技能矩阵     | 中央浮现 Skills 卡片   |
| `projects` | `ls`, `work`    | 查看项目列表     | 中央浮现 Projects 卡片 |
| `focus`    | `research`      | 查看研究方向     | 中央浮现 Focus 卡片    |
| `contact`  | `reach`         | 查看联系方式     | 中央浮现 Contact 卡片  |
| `theme`    | -               | 切换主题         | 终端内提示 + 全局切换  |
| `clear`    | `cls`           | 清屏             | 终端清空               |
| `exit`     | `quit`, `q`     | 退出终端模式     | 淡出返回正常模式       |

### 3.2 命令解析器

```typescript
interface Command {
  name: string;
  aliases: string[];
  handler: (args: string[]) => CommandResult;
}

interface CommandResult {
  type: "text" | "component" | "action";
  content?: string;
  component?: React.ComponentType;
  action?: () => void;
}
```

---

## 4. 视觉设计

### 4.1 终端界面

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│              ╔═══════════════════════════╗              │
│              ║    [浮现的内容卡片]        ║              │
│              ╚═══════════════════════════╝              │
│                                                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  > projects_                                     │    │
│  │                                                  │    │
│  │  [命令输出区域 / 提示信息]                        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 终端容器样式

```css
.terminal-overlay {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--background) 85%, transparent);
  backdrop-filter: blur(20px);
  z-index: 50;
}

.terminal-container {
  position: absolute;
  bottom: 20vh;
  left: 50%;
  transform: translateX(-50%);
  width: min(800px, 90vw);
  padding: 1.5rem;
  font-family: "Geist Mono", monospace;
}

.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
}

.terminal-prompt::before {
  content: ">";
  color: var(--success);
}

.terminal-cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.2em;
  background: var(--primary);
  animation: blink 1s step-end infinite;
}
```

### 4.3 内容卡片浮现效果

```css
.content-card-overlay {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  width: 90%;

  animation: card-emerge 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 90%, transparent);
  backdrop-filter: blur(16px);

  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
    0 0 60px color-mix(in srgb, var(--primary) 15%, transparent),
    0 20px 40px rgba(0, 0, 0, 0.3);
}

@keyframes card-emerge {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}
```

---

## 5. 动画设计

### 5.1 进入终端模式

| 元素       | 动画                                | 时长  | 延迟  | 缓动                          |
| ---------- | ----------------------------------- | ----- | ----- | ----------------------------- |
| 多窗口布局 | opacity: 1→0.3, filter: blur(0→8px) | 300ms | 0ms   | ease-out                      |
| 终端容器   | translateY(100px→0), opacity: 0→1   | 400ms | 100ms | cubic-bezier(0.16, 1, 0.3, 1) |
| 光标       | 开始闪烁                            | -     | 400ms | -                             |

### 5.2 执行内容命令

| 元素     | 动画           | 时长        | 缓动                          |
| -------- | -------------- | ----------- | ----------------------------- |
| 终端背景 | opacity: 1→0.5 | 200ms       | ease-out                      |
| 内容卡片 | card-emerge    | 400ms       | cubic-bezier(0.16, 1, 0.3, 1) |
| 卡片发光 | pulse glow     | 2s infinite | ease-in-out                   |

### 5.3 退出终端模式

| 元素       | 动画                                | 时长  | 缓动     |
| ---------- | ----------------------------------- | ----- | -------- |
| 内容卡片   | opacity: 1→0, scale: 1→0.95         | 200ms | ease-in  |
| 终端容器   | translateY(0→100px), opacity: 1→0   | 300ms | ease-in  |
| 多窗口布局 | opacity: 0.3→1, filter: blur(8px→0) | 300ms | ease-out |

---

## 6. 键盘交互

### 6.1 全局快捷键

| 按键        | 正常模式     | 终端模式     |
| ----------- | ------------ | ------------ |
| `~`         | 进入终端模式 | -            |
| `ESC`       | -            | 退出当前状态 |
| `Enter`     | -            | 执行命令     |
| `Tab`       | -            | 命令补全     |
| `↑/↓`       | -            | 浏览历史     |
| `Ctrl+C`    | -            | 取消输入     |
| `Ctrl+L`    | -            | 清屏         |
| `Backspace` | -            | 删除字符     |

### 6.2 命令历史

- 存储最近的 20 条命令
- 使用 sessionStorage 持久化
- 按 ↑ 切换到上一条，↓ 切换到下一条

---

## 7. 组件设计

### 7.1 TerminalMode 组件

```typescript
interface TerminalModeProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalState {
  history: string[];
  currentInput: string;
  output: TerminalOutput[];
  activeCard: CardType | null;
}
```

### 7.2 组件结构

```
TerminalMode/
├── TerminalMode.tsx          # 主容器
├── TerminalInput.tsx         # 输入区域
├── TerminalOutput.tsx        # 输出显示
├── CommandProcessor.ts       # 命令解析
├── hooks/
│   ├── useTerminalHistory.ts # 历史记录
│   └── useKeyboardHandler.ts # 键盘监听
└── cards/
    ├── HelpCard.tsx
    ├── AboutCard.tsx
    ├── SkillsCard.tsx
    ├── ProjectsCard.tsx
    ├── FocusCard.tsx
    └── ContactCard.tsx
```

---

## 8. 技术实现

### 8.1 状态管理

使用 React Context 管理终端模式状态：

```typescript
interface TerminalContextType {
  isOpen: boolean;
  activeCard: CardType | null;
  openTerminal: () => void;
  closeTerminal: () => void;
  showCard: (card: CardType) => void;
  hideCard: () => void;
  executeCommand: (command: string) => void;
}
```

### 8.2 键盘事件监听

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // 全局 ~ 键监听
    if (e.key === "~" && !isOpen) {
      e.preventDefault();
      openTerminal();
      return;
    }

    // 终端模式内的键盘处理
    if (!isOpen) return;

    switch (e.key) {
      case "Escape":
        if (activeCard) {
          hideCard();
        } else {
          closeTerminal();
        }
        break;
      case "Enter":
        executeCommand(currentInput);
        break;
      // ... 其他按键处理
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isOpen, activeCard, currentInput]);
```

### 8.3 依赖库

- **Framer Motion**: 用于复杂动画（可选，也可用 CSS）
- **React Context**: 状态管理
- 现有技术栈：Next.js + React + TypeScript + Tailwind CSS

---

## 9. 性能优化

- 终端模式组件懒加载（`React.lazy` + `Suspense`）
- 使用 `will-change` 提示浏览器优化动画
- 动画使用 `transform` 和 `opacity`，避免触发 layout
- 键盘事件使用被动监听器
- 内容卡片按需渲染

---

## 10. 无障碍设计

- ESC 键提供标准退出机制
- 终端输入区添加 `aria-label="Terminal command input"`
- 内容卡片添加 `role="dialog"` 和 `aria-modal="true"`
- 支持 `prefers-reduced-motion` 媒体查询

---

## 11. 文件结构

```
components/
├── terminal/
│   ├── TerminalMode.tsx
│   ├── TerminalInput.tsx
│   ├── TerminalOutput.tsx
│   ├── CommandProcessor.ts
│   ├── TerminalProvider.tsx
│   ├── hooks/
│   │   ├── useTerminal.ts
│   │   ├── useTerminalHistory.ts
│   │   └── useKeyboardHandler.ts
│   └── cards/
│       ├── index.ts
│       ├── HelpCard.tsx
│       ├── AboutCard.tsx
│       ├── SkillsCard.tsx
│       ├── ProjectsCard.tsx
│       ├── FocusCard.tsx
│       └── ContactCard.tsx
└── ...existing components
```

---

## 12. 验收标准

### 功能验收

- [ ] 按 `~` 键正常进入终端模式
- [ ] 所有命令正常执行并显示正确内容
- [ ] ESC 和 `exit` 命令都能退出终端模式
- [ ] 命令历史正常工作（↑/↓ 切换）
- [ ] Tab 键命令补全工作正常

### 视觉验收

- [ ] 进入/退出动画流畅（60fps）
- [ ] 内容卡片浮现效果正确
- [ ] 毛玻璃效果在各浏览器正常显示
- [ ] 深色/浅色主题下效果一致

### 性能验收

- [ ] 终端模式首次加载 < 100ms
- [ ] 动画流畅无卡顿
- [ ] 不影响正常模式性能

---

## 13. 参考资料

- [设计模式文档](./2026-03-16-cyber-console-portfolio-design.md)
- Framer Motion 文档
- React Context API
- CSS backdrop-filter
