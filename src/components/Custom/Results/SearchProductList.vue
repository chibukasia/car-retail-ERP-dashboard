<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { uniq } from 'lodash'
import PartOverViewVue from '../cards/PartOverView.vue'
import { ARTICLES_DOMAIN } from '@/composables/constant'

const props = defineProps(['searchTreeId', 'groupName'])

const searchResults: Ref<
  { ART_ID: string | number; SUP_BRAND: string; ART_PRODUCT_NAME: string; image: string; PRODUCT_GROUP: string; ART_ARTICLE_NR: string | number; SUP_ID: string | number }[]
> = ref([])

const brands = computed(() => (
  uniq(searchResults.value.map(item => item.SUP_BRAND))
))

const assemblyGroup: Ref<string> = ref('')
const selectedBrands: Ref<string[]> = ref([])
const loading: Ref<boolean> = ref(false)
const noDataFound: Ref<boolean> = ref(false)
const itemsPerPage: Ref<number> = ref(10)

const currentPage: Ref<number> = ref(1)

const filteredItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return searchResults.value.slice(startIndex, endIndex)
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
    if (responseData.data.length > 0)
      searchResults.value = responseData.data

    else
      noDataFound.value = true

    loading.value = false
  }
  catch (e) {
    console.log(e)
    loading.value = false
  }
})
</script>

<template>
  <div class="flex w-full gap-4">
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
    <div class="w-full md:w-1/2 lg:w-1/3 pb-3">
      <hr>
      <div class="space-y-5 pt-5 w-full">
        <VSelect
          v-model="selectedBrands"
          clearable
          chips
          label="Brand"
          :items="brands"
          multiple
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
          image="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
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
</template>
