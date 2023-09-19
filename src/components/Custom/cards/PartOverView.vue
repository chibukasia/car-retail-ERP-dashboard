<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import useCartStore from '../../../store/cart'

const props = defineProps(['image', 'title', 'status', 'id'])

const router = useRouter()
const store = useCartStore()

const cartObject: Ref<any> = ref({
  name: '',
  quantity: 1,
  price: 0,
})

const handleAddToCart = () => {
  cartObject.value = { ...cartObject.value, name: props.title }
  store.addToCart(cartObject.value)
  console.log(cartObject.value)
}

const handleViewDetails = () => {
  router.push({ name: 'My Search Details', params: { id: props.id, name: props.title } })
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center p-5 gap-4 w-full rounded-md shadow-md bg-white">
    <div class="w-full md:w-1/3  h-40 p-4 flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95">
      <VImg
        :width="300"
        aspect-ratio="16/9"
        class="rounded-md cursor-pointer"
        cover
        :src="props.image"
        @click="handleViewDetails"
      />
    </div>

    <div class="w-full md:2/3 space-y-4 py-3">
      <h3 class="font-bold">
        {{ props.title }}
      </h3>
      <p>Article status: {{ props.status }}</p><hr>
      <slot />
      <div class="w-full flex flex-col md:flex-row gap-2 md:gap-8">
        <VBtn
          color="#2d4aae"
          prepend-icon="mdi-cart"
          class="text-white"
          @click="handleAddToCart"
        >
          Add to cart
        </VBtn>
        <VBtn
          color="#2d4aae"
          prepend-icon="mdi-details"
          class="text-white"
          @click="handleViewDetails"
        >
          View Details
        </VBtn>
      </div>
    </div>
  </div>
</template>
