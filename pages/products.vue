<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { PlusCircle } from 'lucide-vue-next'
import type { Product } from '~/types/unifi';
import { useTimeAgo } from '@vueuse/core'
const notifyCount = useNotifyCount()
const products = useProducts();
const { addProduct } = useAddProduct()

useSeoMeta({
    titleTemplate(title) {
        return `${title} - Stock`
    },
})

const client = useSupabaseClient()
const { data: product, error, refresh, status } = await useAsyncData('products', async () => {
    const { data } = await client.from('products').select('*').order('created_at', { ascending: false })
    notifyCount.value = data?.filter(data => data.notify).length || 0;
    products.value.products = data;
    return data
})

watch(status, (newStatus) => {
    switch (newStatus) {
        case 'pending':
            loading.value = true
            break
        case 'success':
            loading.value = false
            break
        case 'error':
            loading.value = false
            break
    }
})

const loading = ref(false)
async function refreshProducts() {
    await refresh()
};

async function handleAddProduct(product: Product) {
    await addProduct(product)
    await refresh()
}

provide('refreshProducts', refreshProducts);

const inStock = computed(() => product.value?.filter((item) => item.in_stock && !item.last_text_date))
const soldOut = computed(() => product.value?.filter((item) => !item.in_stock && !item.last_text_date))

function lastCheckedAt() {
    if (product.value) {
        const firstProduct = product.value[0];
        if (firstProduct?.last_checked_date) {
            return useTimeAgo(firstProduct?.last_checked_date);
        }
    }
}
</script>

<template>
    <div class="flex w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div class="space-y-2">
                    <div class="flex items-center space-x-4">
                        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Products</h1>
                    </div>
                    <p class="text-lg text-muted-foreground" v-if="product">Last Checked:
                        {{ lastCheckedAt() }}</p>
                </div>
                <Tabs default-value="all" class="overflow-hidden">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="inStock">
                                In Stock
                            </TabsTrigger>
                            <TabsTrigger value="soldOut">
                                Sold Out
                            </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <ClientOnly>
                                <AddStock @submit="handleAddProduct">
                                    <template #trigger>
                                        <Button size="sm" class="h-7 gap-1">
                                            <PlusCircle class="h-3.5 w-3.5" />
                                            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Add Product
                                            </span>
                                        </Button>
                                    </template>
                                </AddStock>
                            </ClientOnly>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Availability</CardTitle>
                                <CardDescription>
                                    View current stock status and select the UniFi products you want to be notified
                                    about when they’re back
                                    in stock.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AddStock v-if="!product || product.length === 0">
                                    <template #trigger>
                                        <button type="button"
                                            class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <img src="https://cdn.prod.website-files.com/622b70d8906c7ab0c03f77f8/63b40a92093c6b2f3767e4e6_tMCv8T-y_400x400.webp"
                                                class="mx-auto h-12 w-12 rounded-md">
                                            <span class="mt-2 block text-sm font-semibold">Start tracking</span>
                                        </button>
                                    </template>
                                </AddStock>
                                <ProductTable v-else :product="product" :loading="loading" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="soldOut">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sold Out</CardTitle>
                                <CardDescription>
                                    Products that are sold out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable :product="soldOut" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="inStock">
                        <Card>
                            <CardHeader>
                                <CardTitle>In Stock</CardTitle>
                                <CardDescription>
                                    Products that are in stock.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable :product="inStock" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>