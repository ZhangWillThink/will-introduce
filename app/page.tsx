import { StatusBar } from "@/components/layout/StatusBar";
import { TerminalWindow } from "@/components/layout/TerminalWindow";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { ContactLog } from "@/components/sections/ContactLog";
import { CommandBar } from "@/components/layout/CommandBar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="theme-page bg-background text-foreground relative isolate flex min-h-svh flex-col overflow-x-clip font-sans selection:bg-blue-500/20 selection:text-blue-950 dark:selection:text-blue-100">
      {/* Background Effects */}
      <div aria-hidden="true" className="theme-page__ambient pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="theme-page__grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="theme-page__orb animate-float-slow pointer-events-none absolute top-20 -right-16 -z-10 h-72 w-72 rounded-full blur-3xl" />

      {/* Skip Link */}
      <a
        href="#main-content"
        className="bg-background text-foreground sr-only absolute top-4 left-4 z-50 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:not-sr-only focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        跳到主要内容
      </a>

      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <main
        id="main-content"
        className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:gap-6 lg:p-6"
      >
        {/* Hero Section - Spans 4 columns on large screens */}
        <section id="hero" aria-label="个人介绍" className="lg:col-span-5 lg:row-span-2">
          <HeroTerminal />
        </section>

        {/* Skills Matrix - Spans 3 columns on large screens */}
        <section id="skills" aria-label="技能列表" className="lg:col-span-3">
          <SkillsMatrix />
        </section>

        {/* Contact Log - Spans 4 columns on large screens */}
        <section id="contact" aria-label="联系方式" className="lg:col-span-4">
          <ContactLog />
        </section>

        {/* Projects - Full width on mobile, spans 8 columns on large screens */}
        <section id="projects" aria-label="项目列表" className="lg:col-span-8">
          <ProjectsList />
        </section>

        {/* Focus Areas - Spans 4 columns on large screens */}
        <section id="focus" aria-label="研究方向" className="lg:col-span-4">
          <FocusAreas />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Bar */}
      <CommandBar />
    </div>
  );
}
