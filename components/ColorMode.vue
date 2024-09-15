<script setup lang="ts">
const colorMode = useColorMode()
import { MoonIcon, SunIcon } from 'lucide-vue-next'

function changeColorMode(mode: string) {
  switch (mode) {
    case 'light':
      colorMode.preference = 'dark';
      break;
    case 'dark':
      colorMode.preference = 'light';
      break;
    default:
      colorMode.preference = 'system';
      break;
  }
}
</script>

<template>
  <component v-if="!$colorMode.unknown" :is="$colorMode.value == 'dark' ? MoonIcon : SunIcon"
    @click="changeColorMode($colorMode.value)" />
</template>
