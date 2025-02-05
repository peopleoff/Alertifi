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
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import type { Product } from '~/types/unifi'
import { Terminal, Loader2 } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFetchProduct } from '~/composables/useFetchProduct'
// Reuse `form` section
const user = useSupabaseUser()
const [UseTemplate, GridForm] = createReusableTemplate()
const [FooterTemplate, UseFooterTemplate] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 500px)')
const notifyCount = useNotifyCount()
const open = ref(false)
const productState = useProducts();
const { loading, result, fetchUrl } = useFetchProduct()
const { handleSubmit } = useProductFormValidation()

async function handlePaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text/plain')
    if (text) {
        await onSubmit()
    }
};

const onSubmit = handleSubmit(async (values) => {
    await fetchUrl(values.url)
    productState.value.tempProduct = result.value;
})

const emit = defineEmits({
    "submit": (product: Product) => {
        return typeof product === 'object' && product !== null
    }
});

function addProduct() {
    if (result.value) {
        emit("submit", result.value)
        open.value = false;
    }
}

function reset() {
    result.value = null
    loading.value = false
}

const itemAlreadyInProducts = computed(() => {
    return productState.value.products.find(item => item.sku == result.value?.sku);
})
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[80vw]">
            <DialogHeader>
                <DialogTitle>Add Product URL</DialogTitle>
                <DialogDescription>
                    Paste in the unifi product url
                </DialogDescription>
            </DialogHeader>
            <div class="min-h-[50vh] md:min-h-[20vh]">
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
                        You've reached your notification limit. The product will be added but won't notify. Upgrade
                        for
                        unlimited notifications!
                    </AlertDescription>
                </Alert>
                <Product v-if="result" :product="result" :loading="loading" />
                <SkeletonProduct v-else-if="loading" />
            </div>
            <DialogFooter>
                <div class="w-full" v-if="user">
                    <Button type="submit" class="w-full" :disabled="loading || itemAlreadyInProducts"
                        @click="addProduct">
                        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                        {{ itemAlreadyInProducts ? 'Item Already Added' : 'Add' }}
                    </Button>
                </div>
                <Login v-else />
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>