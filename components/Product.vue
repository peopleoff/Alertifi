<script setup lang="ts">
import type { Product } from '~/types/unifi';
import { Loader2 } from 'lucide-vue-next'
interface Props {
    product: Product
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    loading: false
})

const emit = defineEmits({
    "submit": (product: Product) => {
        return typeof product === 'object' && product !== null
    }
});

const addProduct = async () => {
    emit('submit', props.product)
}
</script>

<template>
    <div v-if="product" class="flex flex-col gap-1">
        <div class="flex flex-col md:flex-row gap-0 md:gap-4 w-full items-center">
            <div class="overflow-hidden rounded-lg w-36 md:w-full">
                <img :src="product.image.url" alt="Back angled view with bag open and handles to the side."
                    class="object-cover object-center">
            </div>
            <div>
                <h2 class="text-lg md:text-2xl font-bold sm:pr-12">{{ product.name }}</h2>
                <section aria-labelledby="information-heading" class="mt-3">
                    <h3 id="information-heading" class="sr-only">Product information</h3>
                    <PriceDisplay :price="product.offers?.priceSpecification?.price" />
                    <div class="mt-6">
                        <h4 class="sr-only">Description</h4>

                        <p class="text-sm">{{ product.description }}</p>
                    </div>
                </section>
                <section aria-labelledby="options-heading" class="mt-6">
                    <h3 id="options-heading" class="sr-only">Product options</h3>

                </section>
            </div>
        </div>
        <div>
            <Button type="submit" class="w-full" @click="addProduct" :disabled="loading">
                <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                Add
            </Button>
        </div>
    </div>
</template>