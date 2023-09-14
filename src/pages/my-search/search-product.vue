<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import SearchProductDetails from '../../components/Custom/Results/SearchProductDetails.vue'

defineProps(['id'])
</script>

<template>
  <div class="bg-[#f1f1fc] p-5">
    <div class=" w-full md:w-[80%] mx-auto">
      <div class="space-y-4">
        <SearchProductDetails />
      </div>
    </div>
  </div>
</template>
