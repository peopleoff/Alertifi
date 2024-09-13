<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { Loader2 } from 'lucide-vue-next'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
const supabase = useSupabaseClient()


const loading = ref(false);

const validatePhone = (value: string) => {
    return value.replace(/\D/g, '').length === 10
};

const formSchema = toTypedSchema(z.object({
    phone: z.string().refine(validatePhone, 'Invalid phone number')
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    loading.value = true;
    const phoneNumber = values.phone.replace(/\D/g, '');
    await signInWithOtp(phoneNumber)
})



const signInWithOtp = async (phoneNumber: string) => {
    const { error } = await supabase.auth.signInWithOtp({
        phone: `+1${phoneNumber}`,
    })
    if (!error) {
        await navigateTo({ path: '/verify', query: { phone: phoneNumber } })
    }
    else {
        loading.value = false;
        toast({
            title: 'Something went wrong.',
            description: 'There was a problem sending the verification code, please try again.',
            variant: 'destructive'
        });
    }
}
</script>
<template>
    <form @submit="onSubmit" class="w-full">
        <div class="flex w-full max-w-sm items-center gap-1.5">
            <FormField v-slot="{ componentField }" name="phone" >
                <FormItem class="w-full">
                    <FormControl>
                        <Input id="phone" class="text-white" type="text" placeholder="(941)-234-3432"
                            v-bind="componentField" v-maska="'(###)-###-####'" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit" class="w-28" :disabled="loading">
                <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                Start Today
            </Button>

        </div>
    </form>
</template>
