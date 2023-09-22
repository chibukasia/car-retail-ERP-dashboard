<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import CarInfo from '../Results/CarInfo.vue'
import TabButton from '../Buttons/TabButton.vue'
import { CAR_INFO } from '@/composables/constant'
import useCarStore from '@/store/car'
import useManufacturers from '@/composables/manufacturers'
import useModels from '@/composables/models'
import useCars from '@/composables/cars'

interface IButton {
  title: string
  isActive: boolean
  icon: string
  type: string
}

const router = useRouter()
const store = useCarStore()
const { getManufacturers, manufacturers, manufacturersLoading } = useManufacturers()
const { getModels, models, modelsLoading } = useModels()
const { getCars, cars, carsLoading, carData } = useCars()

const selectedType: Ref<string> = ref('PC')

const buttons: Ref<IButton[]> = ref([
  { title: 'Home', isActive: false, icon: 'fa-home', type: 'PC' },
  { title: 'PC', isActive: false, icon: 'fa-car', type: 'PC' },
  { title: 'Motorcycle', isActive: false, icon: 'fa-motorcycle', type: 'MTB' },
  { title: 'CV', isActive: false, icon: 'fa-bus-simple', type: 'CV' },
  { title: 'Tractor', isActive: false, icon: 'fa-tractor', type: 'TRA' },
  { title: 'Engine', isActive: false, icon: 'fa-gears', type: 'ENG' },
  { title: 'Axle', isActive: false, icon: 'fa-arrows-left-right', type: 'AXL' },
])

const currentButton: Ref<string> = ref('Home')

const selectedManufacturer: Ref<string> = ref('')
const car: Ref<string> = ref('')
const model: Ref<string> = ref('')
const manufacturerErr: Ref<string> = ref('')
const carErr: Ref<string> = ref('')
const modelErr: Ref<string> = ref('')
const modelYear: Ref<string> = ref('')
const fuelType: Ref<string> = ref('')
const ccCapacity: Ref<string> = ref('')

// const carData: Ref<any> = ref({})
const loading: Ref<boolean> = ref(false)

const handleRedirect = () => {
  router.push({ name: 'Parts Categories', params: { id: car.value } })
}

const handleTypeClick = (button: IButton) => {
  currentButton.value = button.title
  selectedType.value = button.type
  store.setCarType(selectedType.value)
}

watchEffect(async () => await getManufacturers(selectedType.value))

watch(selectedManufacturer, async () => await getModels({ selectedManufacturer: selectedManufacturer.value, selectedType: selectedType.value }))

watch(model, async () => await getCars({ model: model.value, selectedType: selectedType.value }))

watch(car, async () => {
  try {
    loading.value = true

    const response = await axios.get(CAR_INFO, {
      params: {
        car: car.value,
        typeCar: selectedType.value,
      },
    })

    const data = await response.data

    carData.value = data.data
    store.setCarInfo(carData.value)
    modelYear.value = dayjs(carData.value.PCS_CONSTRUCTION_INTERVAL_START).format('YYYY')
    fuelType.value = carData.value.PC_FUEL_TYPE
    loading.value = false
  }
  catch (err) {
    console.log(err)
    loading.value = false
  }
})

watchEffect(() => {
  loading.value = carsLoading.value || modelsLoading.value || manufacturersLoading.value
})
</script>

<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="manual-search"
  >
    <div class="tabs-buttons">
      <TabButton
        v-for="button in buttons"
        :key="button.title"
        :title="button.title"
        :icon="button.icon"
        :class="{ active: currentButton === button.title }"
        @update-vehicle-type="handleTypeClick(button)"
      />
    </div>
    <div class="w-full flex flex-col md:flex-row gap-4 md:gap-4">
      <div class="w-full md:w-1/3">
        <label> Select Manufactuerer {{ manufacturers.length > 0 ? `(${manufacturers.length})` : '' }} </label>
        <ElSelect
          v-model="selectedManufacturer"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in manufacturers"
            :key="item.MFA_ID"
            :label="item.MFA_BRAND"
            :value="item.MFA_ID"
          />
        </ElSelect>
        <p
          v-if="selectedManufacturer === ''"
          class="text-red-500 text-sm"
        >
          {{ manufacturerErr }}
        </p>
      </div>
      <div class="w-full md:w-1/3">
        <label> Select Model {{ models.length > 0 ? `(${models.length})` : '' }}</label>
        <ElSelect
          v-model="model"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in models"
            :key="item.MS_ID"
            :label="`${item.MS_NAME} Construction Year: ${dayjs(item.MS_CI_TO ? item.MS_CI_TO : item.MS_CI_FROM).format('YYYY/MM')}`"
            :value="item.MS_ID"
          />
        </ElSelect>
        <p
          v-if="model === ''"
          class="text-red-500 text-sm"
        >
          {{ modelErr }}
        </p>
      </div>
      <div class="w-full md:w-1/3">
        <label> Select Car  {{ cars.length > 0 ? `(${cars.length})` : '' }}</label>
        <ElSelect
          v-model="car"
          filterable
          placeholder="Select"
          class="select"
        >
          <ElOption
            v-for="item in cars"
            :key="item.ELEMENT_ID"
            :label="`${item.ELEMENT_NAME} KW: ${item.el3 ?? 'NA'} HP: ${item.el5 ?? 'NA'} ENG: ${item.el7 ?? 'NA'}`"
            :value="Number(item.ELEMENT_ID)"
          />
        </ElSelect>
        <p
          v-if="car === ''"
          class="text-red-500 text-sm"
        >
          {{ carErr }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col md:flex-row gap-4 md:gap-4">
      <div class="w-full md:w-1/3">
        <label> Model Year </label>
        <ElInput
          v-model="modelYear"
          placeholder=""
          disabled
        />
      </div>
      <div class="w-full md:w-1/3">
        <label> Fuel Type</label>
        <ElInput
          v-model="fuelType"
          placeholder=""
          disabled
        />
      </div>
      <div class="w-full md:w-1/3">
        <label> CC Capacity</label>
        <ElInput
          v-model="ccCapacity"
          placeholder=""
          disabled
        />
      </div>
    </div>
    <div v-if="!isEmpty(carData)">
      <CarInfo />
      <div
        v-if="$route.path === '/home'"
        class="pt-5"
      >
        <VBtn
          color="#2d4aae"
          append-icon="mdi-arrow-right"
          class="text-white"
          @click="handleRedirect"
        >
          Go to categories
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style>
.manual-search {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.tabs-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
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
button[disabled]:hover {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: auto;
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

.el-input {
  padding: 0px;
  margin-left: -10px;
}
.select {
  width: 100%;
}

label {
  padding: 5px 0px;
  margin-bottom: 5px;
  font-weight: normal;
}
</style>
