<script setup lang="ts">
import { format } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
interface Props {
    inStock: boolean
    lastTextDate?: string | null
}

const props = withDefaults(defineProps<Props>(), {
    inStock: false,
    lastTextDate: null
})
</script>
<template>
    <Badge class="text-xs" :variant="inStock ? 'default' : 'outline'">
        <TooltipProvider v-if="lastTextDate" :delayDuration="100">
            <Tooltip>
                <TooltipTrigger class="underline decoration-dashed">
                    {{ inStock ? 'In stock' : 'Sold Out' }}
                </TooltipTrigger>

                <TooltipContent>
                    Notified on {{ format(lastTextDate, 'MM/dd/yy') }}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <p v-else>
            {{ inStock ? 'In stock' : 'Sold Out' }}
        </p>
    </Badge>

</template>