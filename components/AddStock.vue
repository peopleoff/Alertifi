<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import type { Product } from "~/types/unifi";
const refreshProducts = inject('refreshProducts') as () => void;
const url = ref('')
const loading = ref(false)
const open = ref(false)
const result = ref<Product | null>(null)

async function handlePaste(event: ClipboardEvent) {
    event.preventDefault()
    const text = event.clipboardData?.getData('text/plain')
    if (text) {
        url.value = text
        await fetchUrl()
    }
};

async function fetchUrl() {
    if (!url.value) return
    loading.value = true
    try {
        const data = await $fetch<Product>('/api/checkUrl', {
            method: 'GET',
            query: {
                url: url.value
            }
        });
        result.value = data
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

async function addProduct(product: Product) {
    loading.value = true
    try {
        await $fetch('/api/addProduct', {
            method: 'POST',
            body: product
        });
        open.value = false
        refreshProducts();
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }

}

function reset() {
    url.value = ''
    result.value = null
    loading.value = false
}


</script>

<template>
    <Dialog @update:open="reset" v-model:open="open">
        <DialogTrigger class="w-full">
            <slot name="trigger" />
        </DialogTrigger>
        <DialogContent class="text-white">
            <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                    Add a product to your stock.
                </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
                <div class="grid flex-1 gap-2">
                    <Label for="link" class="sr-only">
                        Link
                    </Label>
                    <Input v-model="url" @paste="handlePaste" />
                </div>
                <Button type="submit" size="sm" class="px-3" @click="fetchUrl" :disabled="loading">
                    <span>Check</span>
                </Button>
            </div>
            <Product v-if="result" :product="result" :loading="loading" @submit="addProduct" />
            <SkeletonProduct v-else-if="loading" />
        </DialogContent>
    </Dialog>
</template>