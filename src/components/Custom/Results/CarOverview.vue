<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import CarInfo from '../Results/CarInfo.vue'
import HomeSearch from '@/views/home/components/HomeSearch.vue'

const show: Ref<boolean> = ref(false)
const showType: Ref<string> = ref('car-info')
const carImage: Ref<string> = ref('https://imgd.aeplcdn.com/370x208/n/cw/ec/142515/elevate-exterior-right-front-three-quarter-20.jpeg?isig=0&q=80')

const carData: Ref<any> = ref({
  TYPE: 'ACURA EL Saloon 1.6',
  CONSTRUCTION_INTERVAL_START: '1996-09-00',
  CONSTRUCTION_INTERVAL_END: '2000-12-00',
  POWER_KW: 95.0000,
  POWER_PS: 129.0000,
  CAPACITY_LT: 1.6000,
  CAPACITY_TECH: 1590.0000,
  NUMBER_OF_CYLINDERS: 4,
  BODY_TYPE: 'Saloon',
  ENGINE_TYPE: 'Petrol Engine',
  DRIVE_TYPE: 'Front-Wheel Drive',
  FUEL_TYPE: 'Petrol',
  CATALYSATOR_TYPE: 'with three-way catalytic converter',
  FUEL_MIXTURE: 'Intake Manifold Injection/Carburettor',
})

const handleChangeSelection = () => {
  if (show.value) {
    showType.value === 'car-info' ? showType.value = 'select' : show.value = !show.value

    return
  }
  show.value = !show.value
  showType.value = 'select'
}

const handleShowCarInfo = () => {
  if (show.value) {
    showType.value === 'select' ? showType.value = 'car-info' : show.value = !show.value

    return
  }
  show.value = !show.value
  showType.value = 'car-info'
}
</script>

<template>
  <div class="w-full shadow-md rounded-md bg-white dark:bg-black px-10">
    <div class="flex flex-col md:flex-row justify-between ">
      <div class="w-full md:w-1/2 flex flex-col md:flex-row items-center gap-5">
        <VImg
          :width="200"
          aspect-ratio="16/9"
          class="cursor-pointer"
          :src="carImage"
          @click="handleShowCarInfo"
        />
        <VBtn
          variant="text"
          class="hover:bg-[#a9bdf1]"
          @click="handleShowCarInfo"
        >
          {{ carData.TYPE }}
        </VBtn>
      </div>
      <div class="w-full md:w-1/2 flex items-center justify-center px-10">
        <!--
          <VBtn
          variant="text"
          class="hover:bg-[#a9bdf1]"
          >
          Selection History
          </VBtn>
        -->
        <VBtn
          variant="text"
          class="hover:bg-[#a9bdf1]"
          :prepend-icon="show && showType === 'select' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="handleChangeSelection"
        >
          Change Selection
        </VBtn>
      </div>
    </div>
    <div>
      <Transition name="slide-fade">
        <div
          v-if="show"
          class="py-4"
        >
          <CarInfo
            v-if="showType === 'car-info'"
            :car-data="carData"
          />
          <HomeSearch
            v-if="showType === 'select'"
            is-commercial
            is-personal
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
