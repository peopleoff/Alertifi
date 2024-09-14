<script setup lang="ts">
import { CircleUser } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
</script>

<template>
    <header class="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav class="flex-col gap-6 text-lg font-medium flex items-center md:gap-5 md:text-sm lg:gap-6">
            <a href="#" class="flex items-center gap-2 text-lg font-semibold md:text-base">
                <img src="/favicon.ico" class="h-8 w-8" />
                <span>Unifi Checker</span>
            </a>
        </nav>
        <div class="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="secondary" size="icon" class="rounded-full">
                        <CircleUser class="h-5 w-5" />
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
</template>