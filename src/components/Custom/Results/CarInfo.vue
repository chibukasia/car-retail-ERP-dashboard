<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

const props = defineProps(['carData'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carInfo: Ref<any> = ref(props.carData)
</script>

<template>
  <div>
    <h2 class="pb-4 text-xl font-semibold">
      Car info
    </h2>
    <div class="flex flex-col md:flex-row flex-wrap w-full gap-3">
      <div
        v-for="(value, key) in carInfo"
        :key="key"
        class="w-full md:w-[32%]"
      >
        <div class="">
          <p>{{ key.toString().replace(/_/g, ' ') }}: {{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
