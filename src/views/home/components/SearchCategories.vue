<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import PartCard from '../../../components/Custom/cards/PartCard.vue'
import CarOverView from '../../../components/Custom/Results/CarOverview.vue'

const searchResults: Ref<{ id: string | number; name: string; image: string }[]> = ref([
  { id: 1, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412642/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 2, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412643/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 3, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412664/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 4, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412684/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 5, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412669/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 6, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412657/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 7, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412653/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 8, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 9, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412653/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 10, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
  { id: 11, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412669/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
])

const categoryTitle: Ref<string> = ref('Parts Categories')
const page: Ref<number> = ref(1)
</script>

<template>
  <div class="p-3 space-y-4">
    <CarOverView />
    <div>
      <h3 class="blue-text text-lg text-center">
        {{ categoryTitle }}
      </h3>
    </div>
    <div>
      <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="cursor-pointer"
        >
          <RouterLink :to="{ name: 'Search List' }">
            <PartCard
              :name="result.name"
              :image="result.image"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="text-center mt-5">
      <VPagination
        v-model="page"
        :length="2"
        :total-visible="10"
      />
    </div>
  </div>
</template>
