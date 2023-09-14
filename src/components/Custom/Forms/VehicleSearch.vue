<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import CarInfo from '../Results/CarInfo.vue'

interface Option {
  label: string
  value: string
}

const vin: Ref<string> = ref('')
const engine: Ref<string> = ref('')
const model: Ref<string> = ref('Model')
const modelYear: Ref<string> = ref('Model Year')
const ccCapacity: Ref<string> = ref('CC')
const fuelType: Ref<string> = ref('Fuel')

const options: Ref<Option[]> = ref([
  {
    value: 'Option1',
    label: 'Option1',
  }, {
    value: 'Option2',
    label: 'Option2',
  }, {
    value: 'Option3',
    label: 'Option3',
  }, {
    value: 'Option4',
    label: 'Option4',
  }, {
    value: 'Option5',
    label: 'Option5',
  },
])

const carData: Ref<unknown> = ref(null)

const hadleSearchByVin = () => {
  /**
     * @todo update logic to search by vin
     */
}

const handleVehicleSearch = () => {
  /**
     * @todo update logic here
     */
}
</script>

<template>
  <div class="vehicle-search">
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-0">
      <div class="w-full md:w-1/3">
        <label>Search by Vin</label>
        <div class="vin-input">
          <ElInput
            v-model="vin"
            placeholder="156-TU-2999"
            class="input-with-btn"
          />
          <ElButton
            icon="search"
            class="search-btn"
            @click="hadleSearchByVin"
          />
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <label>Select engine</label>
        <div class="vin-input">
          <ElSelect
            v-model="engine"
            filterable
            placeholder="Select engine..."
            class="select-input"
          >
            <ElOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <label>Model</label>
        <div class="vin-input">
          <ElInput
            v-model="model"
            disabled
          />
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <label>Model Year</label>
        <div class="vin-input">
          <ElInput
            v-model="modelYear"
            disabled
          />
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <label>Fuel</label>
        <div class="vin-input">
          <ElInput
            v-model="fuelType"
            disabled
          />
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <label>CC</label>
        <div class="vin-input">
          <ElInput
            v-model="ccCapacity"
            disabled
          />
        </div>
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleVehicleSearch"
      >
        Search
      </ElButton>
    </div>
    <div v-if="carData">
      <CarInfo :car-data="carData" />
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

.input-with-btn {
    width: 85%;
}

.vin-input {
    display: flex;
    flex-wrap: wrap;
}

.search-btn {
    background-color: #2d4aae;
    color: #fff;
    width: 13%;
}

.el-select {
    width: 100%;
}

.search-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
}

label {
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
