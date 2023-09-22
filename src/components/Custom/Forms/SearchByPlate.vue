<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import LabeledSwitch from '../../Custom/Switches/LabeledSwitch.vue'
import CarInfo from '../Results/CarInfo.vue'
import usePlates from '@/composables/plates'

const router = useRouter()

const { carData, error, loading, getByPlates, noDataFound } = usePlates()
const plate: Ref<string> = ref('')
const serie: Ref<string> = ref('')
const plateType: Ref<string> = ref('TU')

const setVehiclePlateType = (value: string) => {
  plateType.value = value
}

const handleSearchByPlate = async () => {
  if (plateType.value === 'TU') {
    if (plate.value === '') {
      error.value = 'Plate number is required'

      return
    }
    if (serie.value === '') {
      error.value = 'Serie code is required'

      return
    }
  }
  else {
    if (plate.value === '') {
      error.value = 'Plate number is required'

      return
    }
  }

  await getByPlates({ plate: plate.value, serie: serie.value })
  await carData.value && router.push({ name: 'Parts Categories', params: { id: carData.value.carId } })
}
</script>

<template>
  <div class="vehicle-search">
    <div>
      <LabeledSwitch
        v-model.trim="plateType"
        :titles="['TU', 'RS']"
        @set-switch-value="setVehiclePlateType"
      />
    </div>
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-0">
      <div class="w-full md:w-1/3">
        <label>Search by Plate</label>
        <div
          v-if="plateType === 'RS'"
          class="flex flex-wrap"
        >
          <ElInput
            v-model="plate"
            placeholder="156-2999"
            class="w-full"
          />
        </div>
        <div
          v-if="plateType === 'TU'"
          class="flex items-center border w-fit bg-[#F5F5F5] rounded-md"
        >
          <div class="">
            <input
              v-model="serie"
              placeholder="Serie: 100"
              class="input-plate bg-white h-10 px-2"
            >
          </div>
          <div class="bg-[#F5F5F5] py-[5px] px-5">
            <p>TU</p>
          </div>
          <div class="">
            <input
              v-model="plate"
              placeholder="Number: 1111"
              class="input-plate bg-white h-10 px-2"
            >
          </div>
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
    <div v-if="carData">
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
.input-plate{
  padding: 5px 3px;
  border: none;
  border-radius: 6px;
  &:focus{
    outline:0.5px solid #86b7fd;
    border-radius: 6px;
  }
}
label {
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
