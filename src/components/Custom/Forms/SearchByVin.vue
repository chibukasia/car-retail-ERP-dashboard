<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { VIN_DOMAIN } from '../../../composables/constant'

const vinInput: Ref<string> = ref('')
const error: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)
const noDataFound: Ref<boolean> = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carData: Ref<any> = ref(null)

const router = useRouter()

const hadleSearchByVin = async () => {
  loading.value = true
  if (vinInput.value === '') {
    error.value = 'VIN number is required'

    return
  }
  if (vinInput.value.length < 17) {
    error.value = 'VIN number is 17 characters long'

    return
  }

  try {
    loading.value = true

    const response = await axios.get(VIN_DOMAIN, {
      params: {
        vin: vinInput.value,
      },
    })

    const responseData = response.data

    if (!responseData.data) {
      noDataFound.value = true
      loading.value = false

      return
    }

    carData.value = responseData.data
    loading.value = false
    router.push({ name: 'Parts Categories', params: { id: responseData.data.carId } })
  }
  catch (err: any) {
    console.log(err)
    loading.value = false
    if (err.response) {
      error.value = err.response.data.message
    }
    else if (err.request) {
      console.log(err.request)
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
}
</script>

<template>
  <div class="vehicle-search">
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4">
      <div class="w-full md:w-1/3">
        <label>Search by Vin</label>
        <div class="vin-input">
          <ElInput
            v-model.trim="vinInput"
            placeholder="WAUBH54B11N111054"
            class="input-with-btn"
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
        @click="hadleSearchByVin"
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
