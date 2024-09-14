<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { ConfigProvider } from 'radix-vue';
useSeoMeta({
  title: 'Ubiquiti  Stock Checker',
  description: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  ogTitle: 'Ubiquiti  Stock Checker',
  ogDescription: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  ogImage: 'https://unifiview.netlify.app/og-image.png',
  ogUrl: 'https://unifiview.netlify.app',
  twitterTitle: 'Ubiquiti  Stock Checker',
  twitterDescription: 'Check the stock of Ubiquiti  products and get notified when they are in stock.',
  twitterImage: 'https://unifiview.netlify.app/og-image.png',
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
  @apply bg-background/90;
  @apply text-white;
}
</style>
