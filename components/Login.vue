<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const supabase = useSupabaseClient()
const phone = ref('')

const signInWithOtp = async () => {
    const phoneNumber = phone.value.replace(/\D/g, '');
    const { error } = await supabase.auth.signInWithOtp({
        phone: `+1${phoneNumber}`,
    })
    if (error) console.log(error)
    else {
        await navigateTo({ path: '/verify', query: { phone: phoneNumber } })
    }
}
</script>
<template>
    <div class="flex w-full max-w-sm items-center gap-1.5">
        <Input id="phone" class="text-white" type="text" placeholder="(941)-234-3432" v-model="phone"
            v-maska="'(###)-###-####'" />
        <Button type="submit" @click="signInWithOtp">
            Subscribe
        </Button>
    </div>
</template>
