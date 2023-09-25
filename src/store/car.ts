import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useCarStore = defineStore('car', () => {
  const cars: Ref<any[]> = ref([])
  const cartInfo: Ref<any> = ref(null)
  const carCategories: Ref<any> = ref(null)
  const carType: Ref<string> = ref('PC')

  const setCars = (carsArr: any[]) => {
    cars.value = carsArr
  }

  const setCarInfo = (cartObject: any) => {
    cartInfo.value = cartObject
  }

  const setCategories = (categories: any) => {
    carCategories.value = categories
  }

  const setCarType = (type: string) => {
    carType.value = type
  }

  return { setCarInfo, cartInfo, setCategories, carCategories, setCarType, carType, cars, setCars }
})

export default useCarStore
