<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

interface IVehicle {
  passenger: string
  commercial: string
}
interface Option {
  label: string
  value: string
}

defineProps({
  isCommercial: Boolean,
  isPersonal: Boolean,
})

const vehicles: Ref<IVehicle> = ref({
  passenger: 'Passenger',
  commercial: 'Commercial vehicle & tractor',
})

const options: Ref<Option[]> = ref([{
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
}])

const manufacturer: Ref<string> = ref('')
const engine: Ref<string> = ref('')
const model: Ref<string> = ref('')
const isSelected: Ref<boolean> = ref(true)
const modelYear: Ref<string> = ref('2023')
const fuelType: Ref<string> = ref('Diesel')
const ccCapacity: Ref<string> = ref('10000')

const handleClick = () => {
  isSelected.value = !isSelected.value
}

const handleManualSearch = () => {
  /**
   * Update logic to handle manual search
   */
}
</script>

<template>
  <div class="manual-search">
    <div class="vehicle-type">
      <button
        class="icon-btn"
        :class="{ active: isSelected }"
        :disabled="!isPersonal"
        @click="handleClick"
      >
        <FontAwesomeIcon icon="fa-solid fa-car" />
        {{ vehicles.passenger }}
      </button>
      <button
        class="icon-btn"
        :class="{ active: !isSelected }"
        :disabled="!isCommercial"
        @click="handleClick"
      >
        <FontAwesomeIcon icon="fa-solid fa-bus-simple" />
        {{ vehicles.commercial }}
      </button>
    </div>
    <div class=" w-full flex flex-col md:flex-row gap-4 md:gap-0">
      <div class="w-full md:w-1/3 ">
        <label> Select Manufactuerer </label>
        <ElSelect
          v-model="manufacturer"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
      <div class="w-full md:w-1/3 ">
        <label> Select <i class="mdi mdi-globe-model:" /></label>
        <ElSelect
          v-model="model"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
      <div class="w-full md:w-1/3 ">
        <label> Select Engine</label>
        <ElSelect
          v-model="engine"
          filterable
          placeholder="Select"
          class="select"
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
    <div class="w-full flex flex-col md:flex-row gap-4 md:gap-0">
      <div class="w-full md:w-1/3">
        <label> Model Year </label>
        <ElInput
          v-model="modelYear"
          placeholder="Please input"
          disabled
        />
      </div>
      <div class="w-full md:w-1/3">
        <label> Fuel Type</label>
        <ElInput
          v-model="fuelType"
          placeholder="Please input"
          disabled
        />
      </div>
      <div class="w-full md:w-1/3">
        <label> CC Capacity</label>
        <ElInput
          v-model="ccCapacity"
          placeholder="Please input"
          disabled
        />
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleManualSearch"
      >
        Search
      </ElButton>
    </div>
  </div>
</template>

<style>
.manual-search {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #d9d9e0;
  color: #2d4aae;
  background-color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}
button:disabled,
button[disabled],
button[disabled]:hover{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor:auto;
}
.active {
  background-color: #2d4aae;
  color: white;
}

.icon:hover,
button:hover {
  background-color: #2d4aae;
  color: white;
}

.vehicle-type {
  display: flex;
  gap: 20px;
}

.el-input{
  padding: 0px;
  margin-left: -10px;
}
.select {
  width: 100%;
}

label{
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
