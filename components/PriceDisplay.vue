<script setup lang="ts">
defineProps<{
    price: number | null
}>()

function formatPrice(price: number) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

</script>

<template>
    <div>
        <p v-if="price">{{ formatPrice(price) }}</p>
        <p v-else>N/A</p>
    </div>
</template>