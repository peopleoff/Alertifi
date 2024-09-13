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
import { PlusCircle } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import type { Tables } from '@/types/database.types'

const url = ref<string | null>(null)
const loading = ref(false)
const result = ref<Tables<"products"> | null>(null)

const fetchUrl = async () => {
    if (!url.value) return
    loading.value = true
    const data = await $fetch<Tables<"products">>('/api/checkUrl', {
        method: 'GET',
        query: {
            url: url.value
        }
    });
    result.value = data
    loading.value = false
}

function reset() {
    url.value = ''
    result.value = null
}


</script>

<template>
    <Dialog @update:open="reset">
        <DialogTrigger>
            <Button size="sm" class="h-7 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                </span>
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md text-white">
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
                    <Input v-model="url" />
                </div>
                <Button type="submit" size="sm" class="px-3" @click="fetchUrl" :disabled="loading">
                    <span>Check</span>
                </Button>
            </div>
            <Product v-if="result" :result="result" />
            <SkeletonProduct v-else-if="loading" />
            <DialogFooter class="sm:justify-start">
                <DialogClose as-child>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>