<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import CarOverView from '../../../components/Custom/Results/CarOverview.vue'
import { CAR_INFO } from '@/composables/constant'
import useCarStore from '@/store/car'

const props = defineProps(['carId'])
const store = useCarStore()
const router = useRouter()

// const searchResults: Ref<{ id: string | number; name: string; image: string }[]> = ref([
//   { id: 1, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412642/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 2, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412643/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 3, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412664/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 4, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412684/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 5, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412669/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 6, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412657/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 7, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412653/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 8, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 9, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412653/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 10, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412638/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
//   { id: 11, name: 'Sample name', image: 'https://media-aftermarket.schaeffler.com/__image/a/412669/alias/xxs/ar/16-9/fn/REPXPERT-Catalog-AssemblyGroup-Tile' },
// ])

const categoryTitle: Ref<string> = ref('Browse Assembly Groups')
const page: Ref<number> = ref(1)
const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)

const handleRedirect = (treeID: string) => {
  router.push({ name: 'Search List', params: { categoryId: treeID } })
}

onMounted(async () => {
  try {
    loading.value = true

    const response = await axios.get(CAR_INFO, {
      params: {
        car: props.carId,
        typeCar: store.carType,
      },
    })

    const data = await response.data

    carCategoriesData.value = data.tree
    store.setCategories(data.tree)
    loading.value = false
  }
  catch (err) {
    console.log(err)
    loading.value = false
  }
})
</script>

<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="p-3 space-y-4"
  >
    <CarOverView />
    <div>
      <h3 class="blue-text text-lg text-center">
        {{ categoryTitle }}
      </h3>
    </div>
    <div>
      <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full ">
        <div
          v-for="(value, key) in carCategoriesData"
          :key="key"
          class="cursor-pointer w-full md:w-80"
          @click="handleRedirect(value[0].ROOT_NODE_STR_ID)"
        >
          <!--
            <RouterLink :to="{ name: 'Search List' }">
            <PartCard
            :name="result.name"
            :image="result.image"
            />
            </RouterLink>
          -->

          <VCard>
            <p class="text-lg font-bold text-center p-5">
              {{ key }}
            </p>
            <VCardActions class="justify-center">
              <VBtn
                class="hover:text-white"
                @click="handleRedirect(value[0].ROOT_NODE_STR_ID)"
              >
                View Related Articles
              </VBtn>
            </VCardActions>
          </VCard>
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
