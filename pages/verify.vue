<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { useForm } from 'vee-validate'
import {
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import {
    PinInput,
    PinInputGroup,
    PinInputInput,
} from '@/components/ui/pin-input'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

useSeoMeta({
    titleTemplate(title) {
        return `${title} - Verify OTP`
    },
})

const { toast } = useToast()
const supabase = useSupabaseClient()
const route = useRoute()
const phone = route.query.phone
const loading = ref(false);
const formSchema = toTypedSchema(z.object({
    code: z.array(z.coerce.string()).length(6, { message: 'Invalid input' }),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    await verify(values.code.join(''))
})

async function handleComplete(value: string[]) {
    await verify(value.join(''));
}

async function verify(code: string) {
    loading.value = true;
    const { error } = await supabase.auth.verifyOtp({
        phone: `+1${phone}`,
        token: code,
        type: 'sms',
    })
    if (!error) {
        await navigateTo('/stock')
    }
    else {
        loading.value = false;
        toast({
            title: 'Something went wrong.',
            description: error.message,
            variant: 'destructive'
        });
    }
}
</script>

<template>
    <main class="flex justify-center items-center h-screen">
        <form @submit="onSubmit">
            <Card class="w-full max-w-sm">
                <CardHeader>
                    <CardTitle class="text-2xl">
                        Verify Phone Number
                    </CardTitle>
                    <CardDescription>
                        Enter the code sent to <span class="font-bold">{{ phone }}</span> to verify your phone number.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <div class="flex w-full max-w-sm items-center gap-1.5">
                        <FormField v-slot="{ componentField, value }" name="code">
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <PinInput id="pin-input" v-model="value!" placeholder="○"
                                        class="flex gap-2 items-center mt-1 otp bg-background" type="number"
                                        :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                                            form.setFieldValue('code', arrStr.filter(Boolean))
                                        }">
                                        <PinInputGroup>
                                            <PinInputInput class="bg-background" v-for="(id, index) in 6" :key="id"
                                                :index="index" />
                                        </PinInputGroup>
                                    </PinInput>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" class="w-full" :disabled="loading">
                        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                        Verify
                    </Button>
                </CardFooter>
            </Card>
        </form>
    </main>
</template>