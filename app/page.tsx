import { StatusBar } from "@/components/layout/StatusBar";
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
      <div aria-hidden="true" className="theme-page__backdrop pointer-events-none absolute inset-0 -z-10" />
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
        className="theme-frame grid flex-1 grid-cols-1 gap-x-8 gap-y-8 py-6 lg:grid-cols-12 lg:py-10"
      >
        <section id="hero" aria-label="个人介绍" className="lg:col-span-7">
          <HeroTerminal />
        </section>

        <div className="grid gap-8 lg:col-span-5 lg:self-start">
          <section id="skills" aria-label="技能列表">
            <SkillsMatrix />
          </section>
          <section id="contact" aria-label="联系方式">
            <ContactLog />
          </section>
        </div>

        <section id="projects" aria-label="项目列表" className="lg:col-span-7">
          <ProjectsList />
        </section>

        <section id="focus" aria-label="研究方向" className="lg:col-span-5 lg:self-start">
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
