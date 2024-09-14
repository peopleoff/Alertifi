<script lang="ts" setup>
import { ref } from 'vue'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { toast } from './ui/toast'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import type { Product } from '~/types/unifi'
import { Terminal } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 500px)')
const notifyCount = useNotifyCount()
const refreshProducts = inject('refreshProducts') as () => void;
const loading = ref(false)
const open = ref(false)
const result = ref<Product | null>(null)

async function handlePaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text/plain')
    if (text) {
        await onSubmit()
    }
};

async function fetchUrl(url: string) {
    loading.value = true
    result.value = null
    try {
        const data = await $fetch<Product>('/api/checkUrl', {
            method: 'GET',
            query: {
                url: url
            }
        });
        result.value = data
    } catch (error) {
        console.error(error)
        toast({
            title: 'Something went wrong.',
            description: 'Error fetching product. Please try again.',
            variant: 'destructive'
        });
    } finally {
        loading.value = false
    }
}

const formSchema = toTypedSchema(z.object({
    url: z.string()
        .url()
        .refine((val) => val.includes('store.ui.com'), {
            message: 'URL must include "store.ui.com"',
        })
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    validateOnMount: false,
})

const onSubmit = handleSubmit((values) => {
    fetchUrl(values.url)
})

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
    result.value = null
    loading.value = false
}


</script>

<template>
    <UseTemplate>
        <form @submit="onSubmit">
            <Input type="text" class="hidden" />
            <FormField v-slot="{ componentField }" name="url" :validate-on-blur="false">
                <FormItem>
                    <FormLabel>Product Url</FormLabel>
                    <div class="flex gap-4">
                        <FormControl>
                            <Input type="text"
                                placeholder="https://store.ui.com/us/en/category/digital-signage/products/uc-display21"
                                v-bind="componentField" @paste="handlePaste" @focus="$event.target.select()" />
                        </FormControl>
                        <Button type="submit" :disabled="loading">
                            Check Item
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            </FormField>
        </form>
        <Alert class="mt-6" v-if="!result && notifyCount >= 3 && !loading">
            <Terminal class="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You've reached your notification limit. The product will be added but won't notify. Upgrade for
                unlimited notifications!
            </AlertDescription>
        </Alert>
        <Product v-if="result" :product="result" :loading="loading" @submit="addProduct" />
        <SkeletonProduct v-else-if="loading" />
    </UseTemplate>

    <Dialog v-if="isDesktop" v-model:open="open" @update:open="reset">
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Product URL</DialogTitle>
                <DialogDescription>
                    Paste in the unifi product url
                </DialogDescription>
            </DialogHeader>
            <div>
                <GridForm />
            </div>
        </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="open" @update:open="reset">
        <DrawerTrigger as-child>
            <slot name="trigger" />
        </DrawerTrigger>
        <DrawerContent class="min-h-[75vh]">
            <DrawerHeader>
                <DrawerTitle>Add Product URL</DrawerTitle>
                <DrawerDescription>
                    Paste in the unifi product url
                </DrawerDescription>
            </DrawerHeader>
            <div class="px-4">
                <GridForm />
            </div>
            <DrawerFooter>
                <DrawerClose as-child>
                    <Button variant="outline">
                        Cancel
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>