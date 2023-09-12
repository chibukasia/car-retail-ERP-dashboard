<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import LabeledSwitch from '../../Custom/Switches/LabeledSwitch.vue'

const plate: Ref<string> = ref('')
const type: Ref<string> = ref('TU')

const setVehiclePlateType = (value: string) => {
  type.value = value
}

const handleSearchByPlate = () => {
/**
 * @todo update logic
 */
}
</script>

<template>
  <div class="vehicle-search">
    <div>
      <LabeledSwitch
        v-model="type"
        :titles="['TU', 'RS']"
        @set-switch-value="setVehiclePlateType"
      />
    </div>
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-0">
      <div class="w-full md:w-1/3">
        <label>Search by Plate</label>
        <div class="flex flex-wrap">
          <ElInput
            v-model="plate"
            placeholder="156-TU-2999"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleSearchByPlate"
      >
        Search
      </ElButton>
    </div>
  </div>
</template>

<style scoped>
.vehicle-search {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.el-input {
    width: 100%;
}

label {
    padding: 5px 0px;
    margin-bottom: 5px;
    font-weight: normal;
}
</style>
