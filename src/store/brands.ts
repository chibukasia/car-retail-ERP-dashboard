import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useBrandStore = defineStore('brand', () => {
  const brands: Ref<string[]> = ref([])

  const setBrands = (brandsArr: string[]) => {
    brands.value = brandsArr
  }

  return { brands, setBrands }
})

export default useBrandStore
