import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

export function useProductFormValidation() {
  const formSchema = toTypedSchema(z.object({
    url: z.string()
      .url()
      .refine((val) => val.includes('store.ui.com'), {
        message: 'URL must include "store.ui.com"',
      })
  }))

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
    validateOnMount: false,
  })

  return {
    handleSubmit
  }
}
