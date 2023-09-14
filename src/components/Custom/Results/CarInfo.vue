<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['carData'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carInfo: Ref<any> = ref(props.carData)
const router = useRouter()

const handleRedirect = () => {
  router.push({ name: 'PartsCategories' })
}
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
        <p>{{ key.toString().replace(/_/g, ' ') }}: {{ value }}</p>
      </div>
    </div>
    <div class="pt-5">
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
</template>
