import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useCarStore = defineStore('car', () => {
  const cartInfo: Ref<any> = ref(null)

  const setCarInfo = (cartObject: any) => {
    cartInfo.value = cartObject
  }

  return { setCarInfo, cartInfo }
})

export default useCarStore
