<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import LabeledSwitch from '../../Custom/Switches/LabeledSwitch.vue'
import CarInfo from '../Results/CarInfo.vue'
import usePlates from '@/composables/plates'

const router = useRouter()

const { carData, error, loading, getByPlates, noDataFound } = usePlates()
const plate: Ref<string> = ref('')
const serie: Ref<string> = ref('TU')

const setVehiclePlateType = (value: string) => {
  serie.value = value
}

const handleSearchByPlate = async () => {
  if (plate.value === '') {
    error.value = 'Plate number is required'

    return
  }

  await getByPlates({ plate: plate.value, serie: serie.value })
  await carData.value && router.push({ name: 'Parts Categories', params: { id: carData.value.carId } })
}
</script>

<template>
  <div class="vehicle-search">
    <div>
      <LabeledSwitch
        v-model.trim="serie"
        :titles="['TU', 'RS']"
        @set-switch-value="setVehiclePlateType"
      />
    </div>
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-0">
      <div class="w-full md:w-6/6">Search by Plate</div>
      <div class="w-full md:w-2/6">
       
        <div class="flex flex-wrap">
          <ElInput
            v-model="plate"
            :placeholder="(serie == 'TU')?`Series : 156`:'999999'"
            class="w-full"
           >
           <template #append>
            <span >{{ serie }}</span>  
           </template>
           </ElInput>
        </div>
        <p
          v-if="error"
          class="text-red-500 text-sm"
        >
          {{ error }}
        </p>
      </div>
      
      <div class="w-full md:w-2/6"  v-if="serie == 'TU'">
        
        <div class="flex flex-wrap">
          <ElInput
            v-model="plate"
            :placeholder="`Number : 2999`"
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

label {
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
