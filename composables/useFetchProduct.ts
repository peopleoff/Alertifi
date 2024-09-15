import { ref } from 'vue'
import { toast } from '@/components/ui/toast'
import type { Product } from '~/types/unifi'

export function useFetchProduct() {
  const loading = ref(false)
  const result = ref<Product | null>(null)

  async function fetchUrl(url: string) {
    loading.value = true
    result.value = null
    try {
      const data = await $fetch<Product>('/api/checkUrl', {
        method: 'GET',
        query: { url }
      });
      result.value = data
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong.',
        description: 'Error fetching product. Please try again.',
        variant: 'destructive'
      });
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    result,
    fetchUrl
  }
}
