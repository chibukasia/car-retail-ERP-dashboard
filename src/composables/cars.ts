import type { Ref } from 'vue'
import { ref } from 'vue'
import axios from 'axios'

export default function useCars() {
  const cars: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getCars = async (url: string) => {
    loading.value = true
    try {
      const data = await axios.get(url)

      return cars.value = data.data
    }
    catch (e: any) {
      loading.value = false
      error.value = e.message
    }
  }

  return {
    cars, carsError: error, carsLoading: loading, getCars,
  }
}
