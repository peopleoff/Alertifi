<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
const supabase = useSupabaseClient()
const route = useRoute()
const phone = route.query.phone
const code = ref('')
const verify = async () => {
    const { error } = await supabase.auth.verifyOtp({
        phone: `+1${phone}`,
        token: code.value,
        type: 'sms',
    })
    if (error) console.log(error)
    else {
        await navigateTo('/stock')
    }
}
</script>

<template>
    <main class="flex justify-center items-center h-screen">
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Verify Phone Number
                </CardTitle>
                <CardDescription>
                    Enter the code sent to {{ phone }} to verify your phone number.
                </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="code">Code</Label>
                    <Input id="code" type="text" placeholder="87329045" required v-model="code" v-maska="'######'" />
                </div>
            </CardContent>
            <CardFooter>
                <Button class="w-full" @click="verify">
                    Verify
                </Button>
            </CardFooter>
        </Card>
    </main>
</template>