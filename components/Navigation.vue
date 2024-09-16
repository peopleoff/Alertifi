<script setup lang="ts">
import { CircleUser } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
const user = useSupabaseUser()
const client = useSupabaseClient()

function formatPhoneNumber(phoneNumber: string | number): string {
    // Convert the input to a string and remove all non-digit characters
    const cleaned = phoneNumber.toString().replace(/\D/g, '');

    // Check if the phone number includes the country code (assumed to be '1' for the US)
    let trimmed = cleaned;
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        trimmed = cleaned.slice(1);
    }

    // Validate that the remaining number has 10 digits
    if (trimmed.length !== 10) {
        throw new Error('Invalid phone number length.');
    }

    // Extract area code, central office code, and line number
    const areaCode = trimmed.slice(0, 3);
    const centralOfficeCode = trimmed.slice(3, 6);
    const lineNumber = trimmed.slice(6);

    // Format the phone number
    return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
}

async function logout() {
    try {
        await client.auth.signOut();
        await navigateTo('/');
    } catch (error) {
        console.error(error);
    }

}

</script>

<template>
    <header class="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav class="flex-col gap-6 text-lg font-medium flex items-center md:gap-5 md:text-sm lg:gap-6">
            <NuxtLink to='/products' class="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <img src="/logo.png" class="h-8 w-8" />
                    <span>Alertifi</span>
            </NuxtLink>
        </nav>
        <div class="flex items-center gap-4 md:ml-auto">
            <ColorMode />
            <DropdownMenu v-if="user">
                <DropdownMenuTrigger as-child>
                    <Button variant="secondary" size="icon" class="rounded-full">
                        <CircleUser class="h-5 w-5" />
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{{ formatPhoneNumber(user?.phone!) }}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
</template>