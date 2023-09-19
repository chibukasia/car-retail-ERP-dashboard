<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import PartDetailsCard from '../cards/PartDetailsCard.vue'
import { SINGLE_ARTICLE } from '@/composables/constant'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const partData: Ref<any> = ref({
  id: 1,
  title: 'ELRING 243.600',
  slug: 'Seal Ring, oil drain plug',
  eanCode: 2434,
  price: 432,
  status: 'Normal',
  deliveryUnit: 3,
  images: [
    'https://media-aftermarket.schaeffler.com/__image/a/412642/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
    'https://media-aftermarket.schaeffler.com/__image/a/412643/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
    'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
  ],
  articleAttributes: [
    { name: 'Manufacturer Restriction', value: 'Nippon Thermostat' },
    { name: 'Inner Diameter [mm]', value: 14 },
    { name: 'Outer Diameter [mm]', value: 22 },
    { name: 'Thickness [mm]', value: 2 },
    { name: 'Material', value: 'Aluminium' },
    { name: 'Shape', value: ' A-Shape' },
    { name: 'DIN/ISO', value: 7603 },
    { name: 'Refrigerant', value: 3.45 },
  ],
})

const articleData: Ref<any> = ref(null)

const quantity: Ref<number> = ref(1)

const quantityIncreament = () => {
  quantity.value++
}

const quantityDecreament = () => {
  quantity.value--
}

const handleAddToCart = () => {
  /**
   * @todo implement add to cart
   */
}

onMounted(async () => {
  try {
    const response = await axios.get(SINGLE_ARTICLE, {
      params: {
        ART_ARTICLE_NR: '',
        ART_ID: '',
        SUP_ID: '',
      },
    })

    const responseData = response.data

    articleData.value = responseData.data
  }
  catch (error: any) {
    console.log(error)
    if (error.response) {
      console.log(error)
    }
    else if (error.request) {
      console.log(error.request)
    }
    else {
      ElMessage({
        message: 'Oops! Something went wrong',
        showClose: true,
        type: 'error',
        customClass: 'font-bold',
      })
    }
  }
})
</script>

<template>
  <div class="space-y-4">
    <div class="pt-4">
      <h2 class="font-bold blue-text text-lg">
        {{ partData.title }}
      </h2>
      <p>{{ partData.slug }}</p>
    </div>
    <div class="bg-white shadow-md p-5 rounded-md">
      <PartDetailsCard
        :images="partData.images"
        :ean-code="partData.eanCode"
        :status="partData.status"
        :delivery-unit="partData.deliveryUnit"
      />
    </div>
    <div class="bg-white shadow-md rounded-md p-5">
      <div class="w-full sm:w-full md:w-1/2 flex flex-col gap-4">
        <h2 class="font-bold text-2xl blue-text">
          Article Attributes
        </h2>
        <div
          v-for="attr in partData.articleAttributes"
          :key="attr.name"
          class="w-full flex"
        >
          <div class="w-1/2">
            <h3>{{ attr.name }}</h3>
          </div>
          <div class="w-1/2">
            <p>{{ attr.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full bg-white shadow-md rounded-md p-5">
      <div class="w-1/2 flex items-center gap-3">
        <VBtn
          density="comfortable"
          variant="text"
          icon="mdi-minus"
          class="bg-[#242a64] text-white"
          :disabled="quantity <= 1"
          @click="quantityDecreament"
        />
        <p class="border p-2 rounded-md text-lg text-black font-semibold">
          {{ quantity }}
        </p>
        <VBtn
          density="comfortable"
          variant="text"
          icon="mdi-plus"
          class="bg-[#242a64] text-white"
          @click="quantityIncreament"
        />
      </div>
      <div class="w-1/2">
        <VBtn
          color="#242a64"
          prepend-icon="mdi-cart"
          class="text-white"
          @click="handleAddToCart"
        >
          Add To Cart
        </VBtn>
      </div>
    </div>
  </div>
</template>
