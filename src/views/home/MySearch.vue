<script setup lang="ts">
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { uniq } from 'lodash'
import CarOverview from '@/components/Custom/Results/CarOverview.vue'
import { CAR_INFO } from '@/composables/constant'
import useCarStore from '@/store/car'
import useBrandStore from '@/store/brands'
import useCars from '@/composables/cars'

const props = defineProps(['carId'])
const store = useCarStore()
const brandStore = useBrandStore()

const { carSuppliersProducts } = useCars()

// const router = useRouter()
const route = useRoute()

const filterTitle: Ref<string> = ref('Categories')
const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)
const nestedCategories: Ref<any[]> = ref([])
const selectedBrand: Ref<string> = ref('')
const assemblyGroup: Ref<string> = ref('')

const brands = computed(() => (
  carSuppliersProducts.value && uniq(carSuppliersProducts.value.map(item => item.SUP_BRAND))
))

onMounted(async () => {
  try {
    loading.value = true

    const response = await axios.get(CAR_INFO, {
      params: {
        car: props.carId,
        typeCar: route.params.targetType,
      },
    })

    const data = await response.data

    carCategoriesData.value = data.tree
    nestedCategories.value = Object.entries(data.tree)
    store.setCategories(data.tree)
    loading.value = false
  }
  catch (err) {
    console.log(err)
    loading.value = false
  }
})

// onBeforeRouteUpdate(async (to, from) => {
//   try {
//     const response = await axios.get(CAR_INFO, {
//       params: {
//         car: to.params.id,
//         typeCar: to.params.targetTYpe,
//       },
//     })

//     const data = await response.data

//     carCategoriesData.value = data.tree
//     nestedCategories.value = Object.entries(data.tree)
//     store.setCategories(data.tree)
//     loading.value = false
//   }
//   catch (err) {
//     console.log(err)
//     loading.value = false
//   }
// })
</script>

<template>
  <div>
    <div class="w-full flex gap-4">
      <div class="w-1/4 space-y-4">
        <div class="bg-white rounded-md px-4 py-2">
          <div class="w-full pb-3 space-y-5">
            <div class="bg-white rounded-md">
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
        </div>
        <div class="bg-white rounded-md">
          <div class="p-4">
            <h2 class="font-bold text-lg">
              {{ filterTitle }}
            </h2>
          </div>
          <div class="rounded-md bg-white">
            <div v-if="carCategoriesData && store.filteredCategories.length === 0">
              <div
                v-for="(values, key) in carCategoriesData"
                :key="key"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                <div>{{ key }}</div>
                <div><VIcon icon="mdi-chevron-right" /></div>
              </div>
            </div>
            <div v-else-if="store.filteredCategories">
              <div
                v-for="item in store.filteredCategories"
                :key="item.NODE_1_STR_ID"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                <div>{{ item.NODE_1_TEXT }}</div>
                <div><VIcon icon="mdi-chevron-right" /></div>
              </div>
            </div>
            <div
              v-if="!loading && !carCategoriesData"
              class="px-4"
            >
              No Categories found
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4 space-y-4">
        <div class="sticky top-0 z-10 w-full space-y-3">
          <CarOverview :car-id="props.carId" />
          <div class="bg-white rounded-md w-full p-3">
            Breadcrumb goes here
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
