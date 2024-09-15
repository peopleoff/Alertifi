<script setup lang="ts">
import type { Product } from '~/types/unifi';

interface Props {
    product: Product
}
defineProps<Props>()
</script>

<template>
    <div v-if="product" class="flex flex-col gap-1">
        <div class="flex flex-col md:flex-row gap-0 md:gap-4 w-full items-center py-6">
            <div class="overflow-hidden rounded-lg w-36 md:w-full">
                <img :src="product.image.url" alt="Back angled view with bag open and handles to the side."
                    class="object-cover object-center">
            </div>
            <div>
                <h2 class="text-lg md:text-2xl font-bold flex-shrink-0">{{ product.name }}</h2>
                <StockBadge :in-stock="product.inStock" />
                <section aria-labelledby="information-heading" class="mt-3">
                    <h3 id="information-heading" class="sr-only">Product information</h3>
                    <PriceDisplay :price="product.offers?.priceSpecification?.price" />
                    <div class="mt-6">
                        <h4 class="sr-only">Description</h4>
                        <p class="text-sm">{{ product.description }}</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>