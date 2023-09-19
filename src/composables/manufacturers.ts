import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { MANUFACTURERS_DOMAIN } from './constant'

interface IManufacturer {
  MFA_ID: string
  MFA_BRAND: string
}

export default function useManufacturers() {
  const manufacturers: Ref<IManufacturer[]> = ref([])
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
    manufacturers, error, manufacturersLoading: loading, getManufacturers,
  }
}
