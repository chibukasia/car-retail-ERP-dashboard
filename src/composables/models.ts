import type { Ref } from 'vue'
import { ref } from 'vue'
import axios from 'axios'

export default function useModels() {
  const models: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getModels = async (url: string) => {
    loading.value = true
    try {
      const data = await axios.get(url)

      return models.value = data.data
    }
    catch (e: any) {
      loading.value = false
      error.value = e.message
    }
  }

  return {
    models, modelsError: error, modelsLoading: loading, getModels,
  }
}
