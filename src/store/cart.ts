import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useCartStore = defineStore('cart', () => {
  const storeCount: Ref<number> = ref(0)

  const cartItems: Ref<any[]> = ref([])

  const addToCart = (cartObject: any) => {
    cartItems.value.push(cartObject)
  }

  const incrementStoreCount = () => {
    storeCount.value++
  }

  return { storeCount, incrementStoreCount, addToCart, cartItems }
})

export default useCartStore
