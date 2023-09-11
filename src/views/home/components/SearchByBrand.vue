<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

interface Option {
  label: string
  value: string
}
const brand: Ref<string> = ref('')
const productGroup: Ref<string> = ref('')

const brandOptions: Ref<Option[]> = ref([
  {
    value: 'Option1',
    label: 'Option1',
  }, {
    value: 'Option2',
    label: 'Option2',
  }, {
    value: 'Option3',
    label: 'Option3',
  },
])

const productGroupOptions: Ref<Option[]> = ref([
  {
    value: 'Option1',
    label: 'Option1',
  }, {
    value: 'Option2',
    label: 'Option2',
  }, {
    value: 'Option3',
    label: 'Option3',
  },
])

const handleSearchByBrand = () => {
  /**
   * @todo update logic here
   */
}
</script>

<template>
  <div class="brand-search">
    <h3 class="blue-text">
      Search By Brand
    </h3>
    <div class="w-full flex flex-col md:flex-row gap-4 md:gap-0">
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
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
  </div>
</template>

<style scoped>
.brand-search {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
