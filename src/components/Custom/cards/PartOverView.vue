<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
const props = defineProps(['image', 'title', 'status'])
</script>

<template>
  <div class="flex items-center p-5 gap-4 w-full rounded-md shadow-md bg-white hover:brightness-75">
    <div class="w-full md:w-1/3  h-40 p-4 flex items-center">
      <VImg
        :width="300"
        aspect-ratio="16/9"
        class="rounded-md"
        cover
        :src="props.image"
      />
    </div>
    <div class="w-full md:2/3 space-y-4 py-3">
      <h3 class="font-bold">
        {{ props.title }}
      </h3>
      <p>Article status: {{ props.status }}</p><hr>
      <slot />
    </div>
  </div>
</template>
