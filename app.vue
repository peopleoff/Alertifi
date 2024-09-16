<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { ConfigProvider } from 'radix-vue';
useSeoMeta({
  title: 'Alertifi',
  description: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  ogTitle: 'Alertifi',
  ogDescription: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  ogImage: 'https://alertifi.io/og-image.png',
  ogUrl: 'https://alertifi.io',
  twitterTitle: 'Alertifi',
  twitterDescription: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  twitterImage: 'https://alertifi.io/og-image.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ]
})

const useIdFunction = () => useId() || '';
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div>
      <Navigation />
      <NuxtPage />
      <Toaster />
    </div>
  </ConfigProvider>
</template>

<style>
body {
  min-height: 100vh;
  background-color: hsl(var(--background));
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
</style>
