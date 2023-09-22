<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { isEmpty } from 'lodash'
import CarInfo from '../Results/CarInfo.vue'
import TabButton from '../Buttons/TabButton.vue'
import { CAR_INFO } from '@/composables/constant'
import useCarStore from '@/store/car'
import useManufacturers from '@/composables/manufacturers'
import useModels from '@/composables/models'
import useCars from '@/composables/cars'

interface IVehicle {
  passenger: string
  commercial: string
}

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

const vehicles: Ref<IVehicle> = ref({
  passenger: 'Passenger',
  commercial: 'Commercial vehicle & tractor',
})

const selectedType: Ref<string> = ref('PC')

const buttons: Ref<IButton[]> = ref([
  // { title: 'Home', isActive: false, icon: 'fa-home', type: 'PC' },
  { title: 'PC', isActive: false, icon: 'fa-car', type: 'PC' },
  { title: 'CV', isActive: false, icon: 'fa-bus-simple', type: 'CV' },
  // { title: 'LVC', isActive: false, icon: 'fa-truck', type: 'DC' },
  { title: 'Motorcycle', isActive: false, icon: 'fa-motorcycle', type: 'MTB' },

  { title: 'Tractor', isActive: false, icon: 'fa-tractor', type: 'TRA' },
  { title: 'Engine', isActive: false, icon: 'fa-gears', type: 'ENG' },
  { title: 'Axel', isActive: false, icon: 'fa-arrows-left-right', type: 'AXL' },
  // { title: 'CV body type', isActive: false, icon: 'fa-van-shuttle', type: 'CV' },
])

const isPersonal: Ref<boolean> = ref(true)
const isCommercial: Ref<boolean> = ref(true)
const currentButton: Ref<string> = ref('PC')

const selectedManufacturer: Ref<string> = ref('')
const car: Ref<string> = ref('')
const model: Ref<string> = ref('')
const manufacturerErr: Ref<string> = ref('')
const carErr: Ref<string> = ref('')
const modelErr: Ref<string> = ref('')
const isSelected: Ref<boolean> = ref(true)
const modelYear: Ref<string> = ref('2023')
const fuelType: Ref<string> = ref('Diesel')
const ccCapacity: Ref<string> = ref('10000')

// const carData: Ref<any> = ref({})
const loading: Ref<boolean> = ref(false)

const fullscreenLoading = ref(false)

const handleClick = () => {
  isSelected.value = !isSelected.value
}

const handleManualSearch = () => {
  if (selectedManufacturer.value === '') {
    manufacturerErr.value = 'Manufactuerer is required'

    return
  }

  if (model.value === '') {
    modelErr.value = 'Model  field required'

    return
  }

  if (car.value === '') {
    carErr.value = 'Car field required'

    return
  }
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
  console.log(car.value, model.value, selectedManufacturer.value)
}

const handleRedirect = () => {
  router.push({ name: 'Parts Categories', params: { id: car.value } })
}

const handleTypeClick = (button: IButton) => {
  if (
    button.title.toLocaleLowerCase() === 'pc'
    || button.title.toLocaleLowerCase() === 'lvc'
    || button.title.toLocaleLowerCase() === 'motorcycle'
  ) {
    isCommercial.value = false
    isPersonal.value = true
  }
  else if (
    button.title.toLocaleLowerCase() === 'cv'
    || button.title.toLocaleLowerCase() === 'tractor'
    || button.title.toLocaleLowerCase() === 'engine'
    || button.title.toLocaleLowerCase() === 'axel'
    || button.title.toLocaleLowerCase() === 'cv body type'
  ) {
    isCommercial.value = true
    isPersonal.value = false
  }
  else {
    isCommercial.value = true
    isPersonal.value = true
  }

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
  <div class="manual-search">
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
    <!-- <div class="vehicle-type">
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
    </div> -->
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
            :label="item.MS_NAME +'&nbsp;&nbsp;&nbsp; '+
            (item.MS_CI_FROM?item.MS_CI_FROM.slice(0,7).replace('-','/'):'')
            +''+
            (item.MS_CI_TO?' - '+item.MS_CI_TO.slice(0,7).replace('-','/'):'')"
            :value="item.MS_ID"
           >
           <span style="display: inline;width: 100%;">{{ item.MS_NAME }}</span>
              &nbsp;&nbsp;&nbsp;
           <span v-if="item.MS_CI_FROM"> {{  item.MS_CI_FROM.slice(0,7).replace('-','/')  }} </span>
           <span v-if="item.MS_CI_TO"> -  {{ item.MS_CI_TO.slice(0,7).replace('-','/')  }} </span>
           </ElOption>
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
            :label="item.ELEMENT_NAME+''+(item.el3?' | '+item.el3:'')
            +''+(item.el4?' | '+item.el4:'')
            +''+(item.el7?' | '+item.el7:'')
            "
            :value="Number(item.ELEMENT_ID)"
          >
          <span >{{ item.ELEMENT_NAME }}</span>
    
          <span v-if="item.el3" > | {{ item.el3 }}   </span>
          <span v-if="item.el4" > | {{ item.el4 }}  </span>
          <span v-if="item.el7" > | {{ item.el7 }}   </span>
          </ElOption>
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
        v-loading.fullscreen.lock="loading"
        class="btn"
        icon="search"
        @click="handleManualSearch"
      >
        Search
      </ElButton>
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
