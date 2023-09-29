import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useCarStore = defineStore('car', () => {
  const cars: Ref<any[]> = ref([])
  const cartInfo: Ref<any> = ref(null)
  const carCategories: Ref<any> = ref(null)
  const carType: Ref<string> = ref('PC')
  const filteredCategories: Ref<any[]> = ref([])
  const filters: Ref<any[]> = ref([])
  const filterLevel: Ref<number> = ref(1)

  const setCars = (carsArr: any[]) => {
    cars.value = carsArr
  }

  const setCarInfo = (cartObject: any) => {
    cartInfo.value = cartObject
  }

  const setCategories = (categoriesData: any) => {
    carCategories.value = categoriesData
  }

  const setCarType = (type: string) => {
    carType.value = type
  }

  const setFilteredCategories = (categoriesArray: any[]) => {
    filteredCategories.value = categoriesArray
  }

  const setFilters = (filtersArr: any[]) => {
    filters.value = filtersArr
  }

  const setFilterLevel = (level: number) => {
    filterLevel.value = level
  }

  return {
    setCarInfo,
    cartInfo,
    setCategories,
    carCategories,
    setCarType,
    carType,
    cars,
    setCars,
    filteredCategories,
    setFilteredCategories,
    filters,
    setFilters,
    filterLevel,
    setFilterLevel,
  }
}, { persist: true })

export default useCarStore
