<script setup lang="ts">
import {
    MoreHorizontal,
} from 'lucide-vue-next'
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
import { useToast } from '@/components/ui/toast/use-toast'
import { format } from "date-fns";
import { Checkbox } from '@/components/ui/checkbox'
import type { Tables } from '@/types/database.types'

interface Props {
    product: Tables<"products">[] | null | undefined
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    product: null,
    loading: false
})
const notifyCount = useNotifyCount()
const client = useSupabaseClient()
const { toast } = useToast()
const refreshProducts = inject('refreshProducts') as () => void;

const checkboxLoading = ref(false);

async function deleteProduct(id: number) {
    const { error } = await client.from('products').delete().eq('id', id)
    if (error) {
        console.error(error)
    }
    refreshProducts();
};

async function notifyProduct(checked: boolean, id: number) {
    const item = props.product?.find(product => product.id === id);
    if (!item) {
        return;
    }
    //If user is trying to add another product, but already has 3 items. Stop being the network call.
    if (notifyCount.value >= 3 && checked) {
        return toast({
            title: 'Max number of products selected',
            description: 'You can only have 3 products selected for notification at a time',
            variant: 'destructive',
            duration: 2500
        });
    }
    checkboxLoading.value = true;
    try {
        const { count } = await $fetch('/api/notifyProduct', {
            method: 'POST',
            body: {
                checked, id
            }
        });
        notifyCount.value = count;
        item.notify = checked;
    } catch (error) {
        item.notify = false;
        toast({
            title: 'Max number of products selected',
            description: 'You can only have 3 products selected for notification at a time',
            variant: 'destructive',
            duration: 2500
        });
    } finally {
        checkboxLoading.value = false;
    }
}

function inNull(value: any) {
    if (value) {
        return true
    } else {
        return false;
    }
}
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
                <TableHead class="table-cell">
                    Notify Me
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
                    <StockBadge :in-stock="item.in_stock" :last-text-date="item.last_text_date" />
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
                                {{ format(item.last_checked_date, 'MM/dd/yy HH:mm:ss aaa') }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div v-else>
                        Never
                    </div>
                </TableCell>
                <TableCell>
                    <Checkbox :disabled="(checkboxLoading || inNull(item.last_text_date) && !item.notify)"
                        :checked="item.notify" @update:checked="notifyProduct($event, item.id)"
                        :loading="checkboxLoading" />
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