import type { Ref } from 'vue'
import { ref } from 'vue'
import axios from 'axios'
import { MANUFACTURERS_DOMAIN } from './constant'

export default function useManufacturers() {
  const manufacturers: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getManufacturers = async (params: any) => {
    loading.value = true
    try {
      loading.value = true

      const response = await axios.get(MANUFACTURERS_DOMAIN, {
        params: {
          typeCar: params,
        },
      })

      const data = await response.data

      manufacturers.value = data.data
      loading.value = false
    }
    catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  return {
    manufacturers, error, loading, getManufacturers,
  }
}
