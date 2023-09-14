<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
defineProps(['name', 'image'])
</script>

<template>
  <VCard class="mx-auto hover:brightness-75">
    <VImg
      :src="image"
      height="150px"
    />

    <h3 class="font-bold text-center p-3">
      {{ name }}
    </h3>
  </VCard>
</template>
