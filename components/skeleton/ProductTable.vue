<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
    <TableBody>
        <TableRow v-for="i in 3" :key="i">
            <TableCell class="hidden sm:table-cell">
                <Skeleton class="w-16 h-24 rounded-md mb-4" />
            </TableCell>
            <TableCell class="text-white">
                <div class="font-medium underline decoration-dashed">
                    <Skeleton class="w-[150px] h-5 rounded-full mb-4" />
                </div>
                <div class="text-sm text-muted-foreground inline">
                    <Skeleton class="w-[100px] h-5 rounded-full mb-4" />
                </div>
            </TableCell>
            <TableCell class="hidden md:table-cell">
                <Skeleton class="w-[75px] h-5 rounded-full mb-4" />
            </TableCell>
            <TableCell>
                <Skeleton class="w-[75px] h-5 rounded-full mb-4" />
            </TableCell>

            <TableCell class="hidden md:table-cell">
                <Skeleton class="w-[100px] h-5 rounded-full mb-4" />
            </TableCell>
            <TableCell>
            </TableCell>
        </TableRow>
    </TableBody>
</template>