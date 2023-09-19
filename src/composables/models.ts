import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { MODELS_DOMAIN } from './constant'

export default function useModels() {
  const models: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getModels = async (params: any) => {
    try {
      loading.value = true

      const response = await axios.get(MODELS_DOMAIN, {
        params: {
          manu: params.selectedManufacturer,
          typeCar: params.selectedType,
        },
      })

      const data = await response.data

      models.value = data.data
      loading.value = false
    }
    catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  return {
    models, modelsError: error, modelsLoading: loading, getModels,
  }
}
