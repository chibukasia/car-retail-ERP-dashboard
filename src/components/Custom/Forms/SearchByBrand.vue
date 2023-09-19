<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import CarInfo from '../../../components/Custom/Results/CarInfo.vue'
import { BRANDS_DOMAIN } from '../../../composables/constant'

interface Brand {
  id: string
  name: string
}
const brand: Ref<string> = ref('')
const productGroup: Ref<string> = ref('')
const brandErr: Ref<string> = ref('')
const groupErr: Ref<string> = ref('')

const brandOptions: Ref<Brand[]> = ref([])

const productGroupOptions: Ref<any[]> = ref([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carData: Ref<any> = ref(null)

const handleSearchByBrand = () => {
  if (brand.value === '') {
    brandErr.value = 'Brand is required'

    return
  }

  if (productGroup.value === '')
    groupErr.value = 'Product group is required'

  /**
   * @todo add search logic
   */
}

/**
 * TO BE TESTED AND THEN REFACTORED
 */

onMounted(async () => {
  try {
    const response = await axios.get(BRANDS_DOMAIN, {
      params: {
        typeCar: 'PC',
      },
    })

    const data = await response.data

    brandOptions.value = data
  }
  catch (error: any) {
    if (error.response) {
      // brandErr.value = error.response.data.message
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

watchEffect(async () => {
  try {
    const response = await axios.get(BRANDS_DOMAIN)
    const data = await response.data

    productGroupOptions.value = data
  }
  catch (error: any) {
    if (error.response) {
      // groupErr.value = error.response.data.message
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
</script>

<template>
  <div class="brand-search">
    <h3 class="blue-text" />
    <div class="w-full flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/3">
        <label> Select Brand </label>
        <ElSelect
          v-model="brand"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in brandOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </ElSelect>
        <p
          v-if="brand === ''"
          class="text-red-500 text-sm"
        >
          {{ brandErr }}
        </p>
      </div>
      <div class="w-full md:w-1/3">
        <label> Select Product Group</label>
        <ElSelect
          v-model="productGroup"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in productGroupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <p
          v-if="productGroup === ''"
          class="text-red-500 text-sm"
        >
          {{ groupErr }}
        </p>
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleSearchByBrand"
      >
        Search
      </ElButton>
    </div>
    <div v-if="carData">
      <CarInfo />
    </div>
  </div>
</template>

<style scoped>
.brand-search {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
