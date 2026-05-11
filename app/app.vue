<script setup lang="ts">
import { nextTick } from 'vue'

import { navItems, site } from '~/config/site'

function skipToMain() {
  document.getElementById('main-content')?.scrollIntoView({ behavior: 'auto', block: 'start' })
  void nextTick(() => {
    document.getElementById('main-content')?.focus({ preventScroll: true })
  })
}

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
    },
  ],
  htmlAttrs: {
    lang: 'zh-CN',
  },
})

useSeoMeta({
  title: `${site.name} — ${site.tagline}`,
  description: site.intro,
})
</script>

<template>
  <UApp>
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">跳到主要内容</a>

    <UHeader>
      <template #left>
        <div class="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
          <NuxtLink
            to="/"
            class="text-default hover:text-primary shrink-0 rounded-md py-3 text-sm font-semibold tracking-wide transition-colors sm:py-2"
          >
            {{ site.name }}
          </NuxtLink>
          <nav
            class="text-muted flex min-w-0 flex-1 scrollbar-none items-center gap-0.5 overflow-x-auto sm:justify-end sm:pl-4"
            aria-label="页面内导航"
          >
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="hover:text-default inline-flex shrink-0 items-center justify-center rounded-md px-3 py-3 text-sm font-medium transition-colors duration-200 sm:min-h-11 sm:px-3 sm:py-2.5"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </template>

      <template #right>
        <UColorModeSelect size="sm" />
      </template>
    </UHeader>

    <UMain>
      <div id="main-content" class="outline-none" tabindex="-1">
        <NuxtPage />
      </div>
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-muted py-2 text-sm">{{ site.name }}</span>
      </template>

      <template #right>
        <div class="text-muted flex flex-wrap items-center gap-x-2 gap-y-2 text-sm sm:gap-x-5">
          <a
            :href="`mailto:${site.email}`"
            class="hover:text-default inline-flex min-h-11 items-center rounded-md px-2 py-3 transition-colors sm:min-h-0 sm:py-2"
            :aria-label="`发邮件至 ${site.email}`"
          >
            Email
          </a>
          <a
            v-if="site.githubUrl"
            :href="site.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-default inline-flex min-h-11 items-center rounded-md px-2 py-3 transition-colors sm:min-h-0 sm:py-2"
          >
            GitHub
          </a>
          <a
            :href="site.siteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-default inline-flex min-h-11 items-center rounded-md px-2 py-3 transition-colors sm:min-h-0 sm:py-2"
          >
            站点
          </a>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
