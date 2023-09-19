/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'

export default function useBrands() {
  const brands: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getBrands = async (url: string) => {
    loading.value = true
    try {
      const data = await axios.get(url)

      return brands.value = data.data
    }
    catch (e: any) {
      loading.value = false
      error.value = e.message
    }
  }

  return {
    brands, brandsError: error, brandsLoading: loading, getBrands,
  }
}
