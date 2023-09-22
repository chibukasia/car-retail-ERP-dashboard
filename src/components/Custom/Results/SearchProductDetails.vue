<script setup lang="ts">
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import PartDetailsCard from '../cards/PartDetailsCard.vue'
import { SINGLE_ARTICLE } from '@/composables/constant'

const props = defineProps(['artId', 'artNumber', 'supId'])

const articleData: Ref<any> = ref(null)
const components: Ref<{ CRITERIA_NAME: string; CRITERIA_VALUE: string }[]> = ref([])
const documents: Ref<{ ART_MEDIA_TYPE: string; ART_MEDIA_SOURCE: string }[]> = ref([])
const specifications: Ref<any[]> = ref([])
const loading: Ref<boolean> = ref(false)

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
    loading.value = true

    const response = await axios.get(SINGLE_ARTICLE, {
      params: {
        ART_ARTICLE_NR: props.artNumber,
        ART_ID: props.artId,
        SUP_ID: props.supId,
      },
    })

    const responseData = response.data

    console.log('RESPOS:', responseData.data.details)
    articleData.value = responseData.data.details
    components.value = responseData.data.components
    documents.value = responseData.data.documents
    specifications.value = responseData.data.specifications
    loading.value = false
  }
  catch (error: any) {
    console.log(error)
    loading.value = false
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

const eancode = computed(() => {
  return articleData.value && articleData.value.EAN_NUMBERS.split(' ')
})
</script>

<template>
  <div v-loading.fullscreen.lock="loading" />
  <div
    v-if="articleData"
    class="space-y-4"
  >
    <div class="pt-4">
      <h2 class="font-bold blue-text text-lg">
        {{ articleData.ART_SUP_BRAND }}
      </h2>
      <p>{{ }}</p>
    </div>
    <div class="bg-white shadow-md p-5 rounded-md">
      <PartDetailsCard
        :images="[articleData.ART_MEDIA_FILE_NAME, documents[0].ART_MEDIA_SOURCE]"
        :ean-code="eancode[1]"
        :status="articleData.ART_STATUS_TEXT"
        :delivery-unit="articleData.ACS_PACK_UNIT"
      />
    </div>
    <div class="bg-white shadow-md rounded-md p-5 flex flex-col md:flex-row">
      <div
        v-if="components.length > 0"
        class="w-full sm:w-full md:w-1/2 flex flex-col gap-4"
      >
        <h2 class="font-bold text-2xl blue-text">
          Article Attributes
        </h2>
        <div
          v-for="attr in components"
          :key="attr.CRITERIA_NAME"
          class="w-full flex"
        >
          <div class="w-1/2">
            <h3>{{ attr.CRITERIA_NAME }}</h3>
          </div>
          <div class="w-1/2">
            <p>{{ attr.CRITERIA_VALUE }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="specifications.length > 0"
        class="w-full sm:w-full md:w-1/2 flex flex-col gap-4"
      >
        <h2 class="font-bold text-2xl blue-text">
          Vehicle Specifications
        </h2>
        <div
          v-for="attr in specifications"
          :key="attr.CRITERIA_NAME"
          class="w-full flex"
        >
          <div class="w-1/2">
            <h3>{{ attr.CRITERIA_NAME }}</h3>
          </div>
          <div class="w-1/2">
            <p>{{ attr.CRITERIA_VALUE }}</p>
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
