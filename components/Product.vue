<script setup lang="ts">
const props = defineProps<{
    result: any
}>()

const addProduct = async () => {
    console.log(props.result)
    const data = await $fetch('/api/addProduct', {
        method: 'POST',
        body: props.result
    });
}
</script>

<template>
    <div v-if="result" class="">
        <div class="flex gap-4 w-full items-start gap-x-6 gap-y-8 lg:gap-x-8">
            <div class="overflow-hidden rounded-lg size-56">
                <img :src="result.image.url" alt="Back angled view with bag open and handles to the side."
                    class="object-cover object-center">
            </div>
            <div>
                <h2 class="text-2xl font-bold sm:pr-12">{{ result.name }}</h2>
                <section aria-labelledby="information-heading" class="mt-3">
                    <h3 id="information-heading" class="sr-only">Product information</h3>
                    <PriceDisplay :price="result.offers?.priceSpecification?.price" />
                    <div class="mt-6">
                        <h4 class="sr-only">Description</h4>

                        <p class="text-sm">{{ result.description }}</p>
                    </div>
                </section>
                <section aria-labelledby="options-heading" class="mt-6">
                    <h3 id="options-heading" class="sr-only">Product options</h3>
                    <div class="mt-6">
                        <Button type="submit" class="w-full" @click="addProduct">Add</Button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>