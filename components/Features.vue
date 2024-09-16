<script setup lang="ts">
import { SmartphoneIcon, ListChecksIcon, CheckCheckIcon } from 'lucide-vue-next'
const features = [
    {
        name: 'Simple and Free to Use',
        description:
            'Easy setup with no hassle—start tracking UniFi products in minutes with our free account options.',
            icon: CheckCheckIcon
    },
    {
        name: 'Customizable Alerts',
        description:
            'Select specific products to be notified about and receive updates tailored to your preferences.',
        icon: ListChecksIcon
    },
    {
        name: 'Real-Time Notifications',
        description:
            'Get instant alerts the moment UniFi products are back in stock, so you never miss out on the items you need.',
        icon: SmartphoneIcon
    },
]
</script>

<template>
    <div class="bg-foreground py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
                <h2 class="text-base font-semibold leading-7 text-primary">Stay Ahead</h2>
                <p class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-secondary">Smart Alerts, Simplified
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">Experience instant alerts, tailored notifications, and
                    an easy-to-use platform that keeps you informed on UniFi product availability.</p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    <div v-for="feature in features" :key="feature.name" class="flex flex-col">
                        <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-secondary">
                            <component :is="feature.icon" class="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                            {{ feature.name }}
                        </dt>
                        <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                            <p class="flex-auto">{{ feature.description }}</p>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>