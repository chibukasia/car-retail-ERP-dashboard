<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import CarInfo from '../Results/CarInfo.vue'
import useParts from '@/composables/parts'
import useArticleStore from '@/store/article'

const router = useRouter()
const store = useArticleStore()

const { articleInfo, error, loading, getByPartNumber, noDataFound } = useParts()
const partNumber: Ref<string> = ref('')

const handleSearchByPlate = async () => {
  if (partNumber.value === '') {
    error.value = 'Part number is required'

    return
  }

  await getByPartNumber(partNumber.value)
  store.setArticleInfo(articleInfo.value)
  await articleInfo.value && router.push({ name: 'My Search Details', params: { id: articleInfo.value.ART_ID, artNumber: articleInfo.value.ART_ARTICLE_NR, supId: articleInfo.value.ART_SUP_ID } })
}
</script>

<template>
  <div class="vehicle-search">
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-0">
      <div class="w-full md:w-1/3">
        <label>Search by Part Number</label>
        <div class="flex flex-wrap">
          <ElInput
            v-model="partNumber"
            placeholder="248 HJS 938 HJ3"
            class="w-full"
          />
        </div>
        <p
          v-if="error"
          class="text-red-500 text-sm"
        >
          {{ error }}
        </p>
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleSearchByPlate"
      >
        Search
      </ElButton>
    </div>
    <div
      v-if="loading"
      class="flex justify-center"
    >
      <VProgressCircular
        :size="35"
        :width="6"
        color="primary"
        indeterminate
      />
    </div>
    <div v-if="noDataFound">
      <p>NO DATA FOUND</p>
    </div>
    <div v-if="articleInfo">
      <CarInfo />
    </div>
  </div>
</template>

<style scoped>
.vehicle-search {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.el-input {
    width: 100%;
}

label {
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
