<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import SearchProductDetails from '../../components/Custom/Results/SearchProductDetails.vue'

defineProps(['id'])
</script>

<template>
  <div class="bg-[#f1f1fc] p-5">
    <VBtn
      prepend-icon="mdi-arrow-left"
      variant="text"
      class="hover: hover:bg-[#a9bdf1] hover:text-white"
      @click="$router.go(-1)"
    >
      Go Back
    </VBtn>
    <div class=" w-full md:w-[80%] mx-auto">
      <div class="space-y-4">
        <SearchProductDetails />
      </div>
    </div>
  </div>
</template>
