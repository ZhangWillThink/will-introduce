<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'zh-CN',
  },
})

useSeoMeta({
  title: '张卫钰 — 用代码解决问题的人',
  description:
    'TypeScript · Golang · React · Vue · Node.js — 从 CLI 工具到 AI Agent，从 Monorepo 到边缘计算，享受把想法变成现实的乐趣。',
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="text-sm font-semibold tracking-wide"> 张卫钰 </NuxtLink>
      </template>

      <template #right>
        <UColorModeSelect size="xs" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-muted text-sm">张卫钰</span>
      </template>

      <template #right>
        <div class="text-muted flex gap-6 text-sm">
          <a href="mailto:zwillthink@163.com" class="hover:text-default transition-colors">Email</a>
          <a href="https://github.com" target="_blank" class="hover:text-default transition-colors"
            >GitHub</a
          >
          <a
            href="https://will-introduce.vercel.app"
            target="_blank"
            class="hover:text-default transition-colors"
            >Blog</a
          >
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
