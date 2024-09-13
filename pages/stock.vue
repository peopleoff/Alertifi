<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
const client = useSupabaseClient()
const { data: product, error } = await useAsyncData('products', async () => {
    const { data } = await client.from('products').select('*').order('created_at', { ascending: false })
    return data
})

const inStock = computed(() => product.value?.filter((item) => item.in_stock && !item.last_text_date))
const soldOut = computed(() => product.value?.filter((item) => !item.in_stock && !item.last_text_date))
const complete = computed(() => product.value?.filter((item) => item.last_text_date))
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="all">
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
                            <TabsTrigger value="complete">
                                Complete
                            </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <AddStock />
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Products</CardTitle>
                                <CardDescription>
                                    Manage your products and view their sales performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable :product="product" />
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
                    <TabsContent value="complete">
                        <Card>
                            <CardHeader>
                                <CardTitle>Complete</CardTitle>
                                <CardDescription>
                                    Products that are complete.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable :product="complete" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>