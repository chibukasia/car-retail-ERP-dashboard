<script setup lang="ts">
import MySearch from '@/views/home/MySearch.vue'

const props = defineProps(['id'])
</script>

<template>
  <div class="bg-[#f1f1fc] space-y-4">
    <div>
      <VBtn
        prepend-icon="mdi-arrow-left"
        variant="text"
        class="hover:bg-[#a9bdf1] hover:text-white"
        @click="$router.go(-1)"
      >
        Go Back
      </VBtn>
    </div>
    <div>
      <MySearch :car-id="props.id"/>
    </div>
  </div>
</template>
