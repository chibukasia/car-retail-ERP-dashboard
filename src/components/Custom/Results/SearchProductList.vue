<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import PartOverViewVue from '../cards/PartOverView.vue'
import { ARTICLES_DOMAIN } from '@/composables/constant'

const searchResults: Ref<
  { id: string | number; title: string; status: string; image: string }[]
> = ref([
  {
    id: 1,
    title: 'Seal Ring, oil drain plugORTECO  005522S',
    status: 'normal',
    image: 'https://media-aftermarket.schaeffler.com/__image/a/412642/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
  },
  {
    id: 2,
    title: 'CORTECO  005590S',
    status: 'normal',
    image: 'https://media-aftermarket.schaeffler.com/__image/a/412643/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
  },
  {
    id: 3,
    title: 'ELRING 243.600',
    status: 'normal',
    image: 'https://media-aftermarket.schaeffler.com/__image/a/412664/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
  },
  {
    id: 4,
    title: 'EFX engine',
    status: 'normal',
    image: 'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile',
  },
])

const optionalFilters: Ref<{ title: string; filters: string[] } | null> = ref({
  title: 'Air conditioning',
  filters: [
    'Wheel Drive Special tools',
    'Steering Wheel Special tools',
    'Wheels or tyre special tools',
    'Two bar special tools',
    'Turbocharger special',
    'Speacial tools electronic',
  ],
})

const brands: Ref<string[]> = ref([
  '3F QAULITY',
  '3 RG',
  '4X4 ESTANFI',
  'AKS DASIS',
  'AS-PL',
  'AUTOCLIMA',
])

const assemblyGroup: Ref<string> = ref('')
const selectedBrands: Ref<string[]> = ref([])
const page: Ref<number> = ref(1)

const handleFilterItemClick = (item: string) => {
  console.log(item)

  /**
   * @todo update logic
   */
}

/**
 * TO BE TESTED AND THEN REFACTORED
 */
onMounted(async () => {
  try {
    const response = await axios.get(ARTICLES_DOMAIN, {
      params: {
        strId: '',
      },
    })

    const responseData = response.data

    searchResults.value = responseData.data
  }
  catch (e) {
    console.log(e)
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
        Air Conditioner
      </h2>
    </div>
  </div>
  <div class="flex flex-col md:flex-row w-full gap-5">
    <div class="w-full md:w-1/2 lg:w-1/3 pb-3">
      <hr>
      <div class="space-y-5 pt-5 w-full">
        <VSelect
          v-model="selectedBrands"
          clearable
          chips
          label="Select"
          :items="brands"
          multiple
        />
        <VDivider />
        <VTextField
          v-model="assemblyGroup"
          label="Search Assembly Group"
          append-inner-icon="mdi-search"
          variant="outlined"
        />
        <div v-if="optionalFilters">
          <VExpansionPanels>
            <VExpansionPanel :title="optionalFilters.title">
              <VExpansionPanelText
                v-for="item in optionalFilters.filters"
                :key="item"
                class="cursor-pointer"
                @click="handleFilterItemClick(item)"
              >
                <p class="hover:text-[#242a64] pb-3">
                  {{ item }}
                </p>
                <hr>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </div>
      </div>
    </div>
    <div class="w-full md:1/2 lg:2/3 space-y-4">
      <hr>
      <div
        v-for="result in searchResults"
        :key="result.id"
      >
        <PartOverViewVue
          :id="result.id"
          :title="result.title"
          :status="result.status"
          :image="result.image"
        >
          <p>Some random description here</p>
        </PartOverViewVue>
      </div>
      <div class="text-center mt-5">
        <VPagination
          v-model="page"
          :length="searchResults.length"
          :total-visible="10"
        />
      </div>
    </div>
  </div>
</template>
