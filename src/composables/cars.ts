import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { CARS_DOMAIN, CAR_INFO } from './constant'
import useCarStore from '@/store/car'

const store = useCarStore()

export default function useCars() {
  const cars: Ref<any[]> = ref([])
  const carData: Ref<any> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getCars = async (params: { model: string; selectedType: string }) => {
    try {
      loading.value = true

      const response = await axios.get(CARS_DOMAIN, {
        params: {
          model: params.model,
          typeCar: params.selectedType,
        },
      })

      const data = await response.data

      cars.value = data.data
      loading.value = false
    }
    catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  const getCarInfo = async (params: { car: string; selectedType: string }) => {
    try {
      loading.value = true

      const response = await axios.get(CAR_INFO, {
        params: {
          car: params.car,
          typeCar: params.selectedType,
        },
      })

      const data = await response.data

      carData.value = data.data
      store.setCarInfo(carData.value)
      loading.value = false
    }
    catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  return {
    cars, carsError: error, carsLoading: loading, getCars, getCarInfo, carData,
  }
}
