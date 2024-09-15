// composables/useAddProduct.ts
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Product } from '~/types/unifi'

export function useAddProduct() {
  const loading = ref(false)
  const { toast } = useToast()

  async function addProduct(product: Product) {
    loading.value = true
    try {
      await $fetch('/api/addProduct', {
        method: 'POST',
        body: product,
      })
      // Optionally, you can handle a success notification or other actions here
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: 'There was a problem adding the product. Please try again.',
        variant: 'destructive',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    addProduct,
  }
}
