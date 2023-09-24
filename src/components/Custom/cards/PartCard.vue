<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { S3_STORAGE_IMAGE } from '@/composables/constant'

defineProps(['name', 'image'])
</script>

<template>
  <VCard class="mx-auto hover:brightness-75" width="250">
    <VImg
      :src="`${S3_STORAGE_IMAGE}articles/article_img_not_found.png`"
      height="150px"
    />

    <h3 class="font-bold text-center p-3">
      {{ name }}
    </h3>
  </VCard>
</template>
