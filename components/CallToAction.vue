<script setup lang="ts"></script>

<template>
    <div class="bg-background">
        <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Get Notified</h2>
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8">Join Alertifi.io and be the first to
                    know when UniFi products are back in stock. It’s quick, easy, and free.</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <AddStock>
                        <template #trigger>
                            <Button>Start Tracking</Button>
                        </template>
                    </AddStock>
                </div>
            </div>
        </div>
    </div>
</template>