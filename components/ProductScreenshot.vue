<template>
    <img v-if="$colorMode.unknown" src="https://placehold.co/600x400/EEE/31343C">
    <img v-else :src="$colorMode.value == 'dark' ? '/images/product_dark.png' : '/images/product_light.png'"
        alt="App screenshot" width="2432" height="1442"
        class="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10" />
</template>
