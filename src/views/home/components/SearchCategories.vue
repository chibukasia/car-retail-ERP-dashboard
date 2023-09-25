<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { uniqBy } from 'lodash'
import CarOverView from '../../../components/Custom/Results/CarOverview.vue'
import { CAR_INFO, S3_STORAGE_IMAGE } from '@/composables/constant'
import useCarStore from '@/store/car'
import PartCard from '@/components/Custom/cards/PartCard.vue'

const props = defineProps(['carId'])

interface ICategory {
  STR_LEVEL: number
  ROOT_NODE_TEXT: string
  ROOT_NODE_STR_ID: string
  NODE_1_TEXT: string
  NODE_1_STR_ID: string
  NODE_2_TEXT: string | null
  NODE_2_STR_ID: string | null
  NODE_3_TEXT: string | null
  NODE_3_STR_ID: string | null
}

const store = useCarStore()

const router = useRouter()
const route = useRoute()

// const route = useRoute()

const categoryTitle: Ref<string> = ref('Browse Assembly Groups')

const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)

const nestedCategories: Ref<any[]> = ref([])
const categories: Ref<ICategory[]> = ref([])
const level2FilteredItems: Ref<ICategory[]> = ref([])
const level3FilteredItems: Ref<ICategory[]> = ref([])
const level4FilteredItems: Ref<ICategory[]> = ref([])
const filterTitle: Ref<string> = ref('Categories')

const handleRedirect = (treeID: string, treeName: string) => {
  router.push({ name: 'Search List', params: { categoryId: treeID, groupName: treeName, carId: props.carId } })
}

const handleLevel2Click = (item: ICategory) => {
  level2FilteredItems.value = categories.value.filter((obj: ICategory) => obj.NODE_1_STR_ID === item.NODE_1_STR_ID)
  if (item.STR_LEVEL === 2)
    handleRedirect(item.NODE_1_STR_ID, item.NODE_1_TEXT)

  else
    level3FilteredItems.value = categories.value.filter((obj: ICategory) => obj.NODE_1_STR_ID === item.NODE_1_STR_ID)
}

const handleLevel3Click = (item: ICategory) => {
  if (item.STR_LEVEL === 3)
    item.NODE_2_STR_ID && item.NODE_2_TEXT && handleRedirect(item.NODE_2_STR_ID, item.NODE_2_TEXT)

  else
    level4FilteredItems.value = categories.value.filter((obj: ICategory) => obj.NODE_2_STR_ID === item.NODE_2_STR_ID)
}

const handleLevel4Click = (item: ICategory) => {
  item.NODE_3_STR_ID && item.NODE_3_TEXT && handleRedirect(item.NODE_3_STR_ID, item.NODE_3_TEXT)
}

const handlePrimaryCategoryClick = (values: ICategory[]) => {
  level2FilteredItems.value = uniqBy(values, 'NODE_1_TEXT')
  categories.value = values
  nestedCategories.value = level2FilteredItems.value

  // router.push({ name: 'Parts Categories', params: { id: route.params.id, category: values[0].ROOT_NODE_TEXT } })
}

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
onBeforeRouteUpdate(async (to, from) => {
  try {
    const response = await axios.get(CAR_INFO, {
      params: {
        car: to.params.id,
        typeCar: to.params.targetTYpe,
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
</script>

<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="p-3 space-y-4 scroll-smooth"
  >
    <div class="sticky top-0 z-10">
      <CarOverView :car-id="carId" />
    </div>

    <div>
      <h3 class="blue-text text-lg text-center">
        {{ categoryTitle }}
      </h3>
    </div>
    <div class="w-full flex gap-4">
      <div class="w-1/4">
        <div class="bg-white rounded-md">
          <div class="p-4">
            <h2 class="font-bold text-lg">
              {{ filterTitle }}
            </h2>
          </div>
          <div class="rounded-md bg-white">
            <div v-if="level2FilteredItems.length === 0">
              <div v-if="carCategoriesData">
                <div
                  v-for="(values, key) in carCategoriesData"
                  :key="key"
                  class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  @click="handlePrimaryCategoryClick(values)"
                >
                  <div>{{ key }}</div>
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
            <div v-else-if="level2FilteredItems.length > 0 && level3FilteredItems.length === 0 && level4FilteredItems.length === 0">
              <div
                v-for="item in level2FilteredItems"
                :key="item.NODE_1_STR_ID"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleLevel2Click(item)"
              >
                <div>{{ item.NODE_1_TEXT }}</div>
                <div><VIcon :icon="`${item.NODE_2_TEXT ? 'mdi-chevron-right' : ''}`" /></div>
              </div>
            </div>
            <div v-else-if="level3FilteredItems.length > 0 && level4FilteredItems.length === 0">
              <div
                v-for="(item, index) in level3FilteredItems"
                :key="item.NODE_2_STR_ID ?? index"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleLevel3Click(item)"
              >
                <div>{{ item.NODE_2_TEXT }}</div>
                <div><VIcon :icon="`${item.NODE_3_TEXT ? 'mdi-chevron-right' : ''}`" /></div>
              </div>
            </div>
            <div v-else-if="level4FilteredItems.length === 0">
              <div
                v-for="(item, index) in level4FilteredItems"
                :key="item.NODE_2_STR_ID ?? index"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleLevel4Click(item)"
              >
                <div>{{ item.NODE_2_TEXT }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4">
        <div v-if="level2FilteredItems.length === 0">
          <div v-if="carCategoriesData">
            <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
              <div
                v-for="(values, key) in carCategoriesData"
                :key="key"
              >
                <PartCard
                  :name="key"
                  :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${values[0].ROOT_NODE_STR_ID}.png`"
                  @click="handlePrimaryCategoryClick(values)"
                />
              </div>
            </div>
          </div>
          <div
            v-if="!loading && !carCategoriesData"
            class="px-4 flex items-center text-xl font-bold text-center"
          >
            Unfortunately, we do not offer any products for the particular vehicle at this time.
            You can choose another vehicle or search for articles using the free text search.
          </div>
        </div>
        <div v-else-if="level2FilteredItems.length > 0 && level3FilteredItems.length === 0 && level4FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="item in level2FilteredItems"
              :key="item.NODE_1_STR_ID"
            >
              <PartCard
                :name="item.NODE_1_TEXT"
                :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_1_STR_ID}.png`"
                @click="handleLevel2Click(item)"
              />
            </div>
          </div>
        </div>
        <div v-else-if="level3FilteredItems.length > 0 && level4FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="(item, index) in level3FilteredItems"
              :key="item.NODE_2_STR_ID ?? index"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_2_STR_ID}.png`"
            >
              <PartCard
                :name=" item.NODE_2_TEXT"
                @click="handleLevel3Click(item)"
              />
            </div>
          </div>
        </div>
        <div v-else-if="level4FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="(item, index) in level4FilteredItems"
              :key="item.NODE_2_STR_ID ?? index"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_3_STR_ID}.png`"
            >
              <PartCard
                :name=" item.NODE_2_TEXT"
                @click="handleLevel4Click(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
