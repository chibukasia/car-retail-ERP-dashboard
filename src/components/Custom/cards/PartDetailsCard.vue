<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
const props = defineProps(['images', 'title', 'eanCode', 'price', 'status', 'deliveryUnit'])
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row gap-6 w-full items-center">
      <div class="w-full md:w-1/2">
        <VCarousel
          cycle
          :interval="3000"
        >
          <VCarouselItem
            v-for="image in props.images"
            :key="image"
            :src="image"
          />
        </VCarousel>
      </div>
      <div class="w-full md:w-1/2 space-y-4 py-3 aspect-square flex flex-col justify-center">
        <div>
          <h3 class="font-bold">
            Article Status
          </h3>

          <p>{{ props.status }}</p>
        </div>
        <div>
          <h3 class="font-bold">
            EAN Code
          </h3>
          <p>{{ props.eanCode }}</p>
        </div>
        <div>
          <h3 class="font-bold">
            Delivery Unit
          </h3>
          <p>{{ props.deliveryUnit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
