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

const categoryTitle: Ref<string> = ref('Browse Assembly Groups')

const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)

const nestedCategories: Ref<any[]> = ref([])

const handleRedirect = (treeID: string, treeName: string) => {
  router.push({ name: 'Search List', params: { categoryId: treeID, groupName: treeName } })
}

const getFirstKey = (obj: any) => {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key))
      return key
  }

  return null
}

const onTabClick = (key: string | number) => {
  nestedCategories.value = carCategoriesData.value[key]
  console.log(nestedCategories.value)
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

watch(carCategoriesData, () => {
  const firstKey = getFirstKey(carCategoriesData.value)

  firstKey !== null ? nestedCategories.value = carCategoriesData.value[firstKey] : nestedCategories.value = []
  console.log(nestedCategories.value)
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
      <div class="flex flex-wrap flex-col justify-center md:flex-row gap-6 w-full ">
        <div class="w-full">
          <ElTabs
            tab-position="top"
            class="demo-tabs"
            type="border-card"
          >
            <ElTabPane
              v-for="(values, key) in carCategoriesData"
              :key="key"
              :label="key as unknown as string"
              @click="onTabClick(key)"
            >
              <div class="w-[72] flex flex-wrap gap-5">
                <VCard

                  v-for="item in values"
                  :key="item.NODE_1_STR_ID"
                  width="270"
                >
                  <p class="text-lg font-bold text-center p-5">
                    {{ item.NODE_3_TEXT ? item.NODE_3_TEXT : item.NODE_2_TEXT ? item.NODE_2_TEXT : item.NODE_1_TEXT }}
                  </p>
                  <VCardActions class="justify-center">
                    <VBtn
                      class="hover:text-white"
                      @click="handleRedirect(item.NODE_2_STR_ID ? item.NODE_2_STR_ID : item.NODE_1_STR_ID ? item.NODE_1_STR_ID : item.ROOT_NODE_STR_ID, item.ROOT_NODE_TEXT)"
                    >
                      View Related Articles
                    </VBtn>
                  </VCardActions>
                </VCard>
              </div>
            </ElTabPane>
          </ElTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
