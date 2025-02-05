<template>
    <footer class="bg-background">
        <div class="mx-auto max-w-7xl overflow-hidden px-6 py-8">
            <nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
                <NuxtLink v-for="item in navigation.main" :key="item.name" :to="item.href"
                    class="text-foreground hover:text-primary">{{ item.name }}</NuxtLink>
            </nav>
            <p class="mt-10 text-center text-sm/6 text-muted-foreground">&copy; {{ year }} Alertifi. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { defineComponent, h } from 'vue'

const navigation = {
    main: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Use', href: '/terms-of-use' },
    ]
}

const year = new Date().getFullYear()
</script>