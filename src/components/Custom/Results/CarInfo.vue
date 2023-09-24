<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { pickBy } from 'lodash'

const props = defineProps(['carDetails'])
const carData: Ref<any> = ref(null)

const newCarData = computed(() => {
  return pickBy(props.carDetails ?? carData.value, (value: any) => value !== null)
})

onMounted(() => {
  carData.value = JSON.parse(localStorage.getItem('carData') || '{}')
})
</script>

<template>
  <div v-if="newCarData">
    <h2 class="pb-4 text-xl font-semibold">
      Car info
    </h2>
    <div class="flex flex-col md:flex-row flex-wrap w-full gap-3">
      <div
        v-for="(value, key) in newCarData"
        :key="key"
        class="w-full md:w-[32%]"
      >
        <p v-if="value !== null">
          {{ key.toString().replace(/_/g, ' ') }}: {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>
