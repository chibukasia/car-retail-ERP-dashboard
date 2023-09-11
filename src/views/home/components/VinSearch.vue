<script setup lang="ts">
import { } from 'vue'
import ManualSearch from '../../../components/Custom/Forms/ManualSearch.vue'
import VehicleSearch from '../../../components/Custom/Forms/VehicleSearch.vue'

defineProps({
  isCommercial: Boolean,
  isPersonal: Boolean,
})
</script>

<template>
  <ElTabs type="border-card">
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Manual Search</span>
        </span>
      </template>
      <div>
        <ManualSearch
          :is-commercial="isCommercial"
          :is-personal="isPersonal"
        />
      </div>
    </ElTabPane>
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Vehicle Search</span>
        </span>
      </template>
      <VehicleSearch />
    </ElTabPane>
  </ElTabs>
</template>
