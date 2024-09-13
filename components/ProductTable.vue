<script setup lang="ts">
import {
    MoreHorizontal,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Tables } from '@/types/database.types'

interface Props {
    product: Tables<"products">[] | null | undefined
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    product: null,
    loading: false
})
const client = useSupabaseClient()

const refreshProducts = inject('refreshProducts') as () => void;

async function deleteProduct(id: number) {
    const { error } = await client.from('products').delete().eq('id', id)
    if (error) {
        console.error(error)
    }
    refreshProducts();
};
</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead class="hidden w-[100px] sm:table-cell">
                    <span class="sr-only">img</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead class="hidden md:table-cell">
                    Price
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="hidden md:table-cell">
                    Last Checked
                </TableHead>
                <TableHead>
                    <span class="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <SkeletonProductTable v-if="loading" />
        <TableBody v-else-if="product && product.length > 0">
            <TableRow v-for="item in product" :key="item.id">
                <TableCell class="hidden sm:table-cell">
                    <img alt="Product image" v-if="item.image_url" class="aspect-square rounded-md object-cover"
                        height="64" :src="item.image_url" width="64">
                </TableCell>
                <TableCell class="text-white">
                    <div class="font-medium underline decoration-dashed">
                        <NuxtLink :to="item.url" external>
                            {{ item.title }}
                        </NuxtLink>
                    </div>
                    <div class="text-sm text-muted-foreground inline">
                        {{ item.sku }}
                    </div>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                    <PriceDisplay :price="item.price" />
                </TableCell>
                <TableCell>
                    <Badge v-if="item.last_text_date" variant="complete">
                        Complete
                    </Badge>
                    <Badge v-else class="text-xs" :variant="item.in_stock ? 'default' : 'outline'">
                        {{ item.in_stock ? 'In stock' : 'Sold Out' }}
                    </Badge>
                </TableCell>

                <TableCell class="hidden md:table-cell">
                    <TooltipProvider v-if="item.last_checked_date" :delayDuration="100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div class="underline decoration-dashed">
                                    {{ useTimeAgo(new Date(item.last_checked_date)) }}
                                </div>
                            </TooltipTrigger>

                            <TooltipContent>
                                {{ item.last_checked_date }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div v-else>
                        Never
                    </div>
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal class="h-4 w-4" />
                                <span class="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem @click="deleteProduct(item.id)">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>