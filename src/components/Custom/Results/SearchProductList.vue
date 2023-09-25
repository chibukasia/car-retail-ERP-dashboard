<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { uniq } from 'lodash'
import PartOverViewVue from '../cards/PartOverView.vue'
import CarOverview from './CarOverview.vue'
import { ARTICLES_DOMAIN, S3_STORAGE_IMAGE } from '@/composables/constant'

interface IArticle {
  ART_ID: string | number
  SUP_BRAND: string
  ART_PRODUCT_NAME: string
  image: string
  PRODUCT_GROUP: string
  ART_ARTICLE_NR: string | number
  SUP_ID: string | number
  ART_MEDIA_FILE_NAME: string
}

const props = defineProps(['searchTreeId', 'groupName', 'carId'])

const searchResults: Ref<IArticle[]> = ref([])

const assemblyGroup: Ref<string> = ref('')
const selectedBrand: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)
const noDataFound: Ref<boolean> = ref(false)
const itemsPerPage: Ref<number> = ref(10)
const filteredSearchResults: Ref<IArticle[]> = ref([])

const currentPage: Ref<number> = ref(1)

const filteredSearchResultsByBrand = computed(() => {
  if (selectedBrand.value === '')
    return searchResults.value

  return searchResults.value.filter((item: IArticle) => item.SUP_BRAND === selectedBrand.value)
})

const filteredSearchResultsByAssemblyGroup = computed(() => {
  return searchResults.value.filter((item: IArticle) => item.PRODUCT_GROUP.toLowerCase().includes(assemblyGroup.value.toLowerCase()))
})

watch(selectedBrand, () => {
  filteredSearchResults.value = filteredSearchResultsByBrand.value
})

watch(assemblyGroup, () => {
  filteredSearchResults.value = filteredSearchResultsByAssemblyGroup.value
})

const brands = computed(() => (
  uniq(searchResults.value.map(item => item.SUP_BRAND))
))

const filteredItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return filteredSearchResults.value.slice(startIndex, endIndex)
})

const pagedItems = computed(() => {
  return filteredItems.value
})

onMounted(async () => {
  try {
    loading.value = true

    const response = await axios.get(ARTICLES_DOMAIN, {
      params: {
        strid: props.searchTreeId,
      },
    })

    const responseData = response.data
    if (responseData.data.length > 0) {
      searchResults.value = responseData.data
      filteredSearchResults.value = searchResults.value
    }
    else {
      noDataFound.value = true
    }

    loading.value = false
  }
  catch (e) {
    console.log(e)
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="sticky top-0 z-10">
      <CarOverview :car-id="carId" />
    </div>
    <div class="flex w-full gap-4 pt-5">
      <div class="w-full md:w-1/2 lg:w-1/3 pb-3">
        <h2 class="font-bold">
          Filter By
        </h2>
      </div>
      <div class="w-full md:w-1/2 lg:w-2/3 pb-3">
        <h2 class="font-bold">
          {{ props.groupName }}
        </h2>
      </div>
    </div>
    <div
      v-loading.fullscreen.lock="loading"
      class="flex flex-col md:flex-row w-full gap-5"
    >
      <div class="w-full md:w-1/2 lg:w-1/3 pb-3 space-y-5">
        <hr>
        <div class="bg-white p-4 rounded-md">
          <div class="space-y-5 pt-5 w-full">
            <VSelect
              v-model="selectedBrand"
              label="Brand"
              :items="brands"
              variant="outlined"
            />
            <VDivider />
            <VTextField
              v-model="assemblyGroup"
              label="Search Product Group"
              append-inner-icon="mdi-search"
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div class="w-full md:1/2 lg:2/3 space-y-4">
        <hr>
        <div
          v-if="noDataFound"
          class="flex flex-col  rounded-md"
        >
          <p class="text-xl text-center font-bold">
            Unfortunately, we could not find any article related to your search
          </p>
        </div>
        <div
          v-for="result in pagedItems"
          :key="result.ART_ID"
        >
          <PartOverViewVue
            :id="result.ART_ID"
            :art-number="result.ART_ARTICLE_NR"
            :sup-id="result.SUP_ID"
            :brand="result.SUP_BRAND"
            :product-name="result.ART_PRODUCT_NAME"
            :product-group="result.PRODUCT_GROUP"
            :image=" `${S3_STORAGE_IMAGE}articles/${result.SUP_ID}/${result.ART_MEDIA_FILE_NAME}`"
          />
        </div>
        <div class="text-center mt-5">
          <VPagination
            v-model="currentPage"
            :length="Math.ceil(searchResults.length / itemsPerPage)"
            :total-visible="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>
