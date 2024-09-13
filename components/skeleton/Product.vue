<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <div
        class="relative flex w-full items-center overflow-hidden px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
        <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div class="sm:col-span-4 lg:col-span-5">
                <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                    <Skeleton class="w-full h-[100px] md:h-[200px]" />
                </div>
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
                <section aria-labelledby="information-heading" class="mt-3">
                    <Skeleton class="w-[200px] h-5 rounded-full mb-4" />
                    <Skeleton class="w-[100px] h-5 rounded-full" />
                    <div class="mt-6">
                        <Skeleton class="h-4 md:h-8 rounded-full mb-2" />
                        <Skeleton class="h-4 md:h-8 rounded-full" />
                    </div>
                </section>

                <section class="mt-6">
                    <div class="mt-6">
                        <Skeleton class="h-6 md:h-12 rounded-full" />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>