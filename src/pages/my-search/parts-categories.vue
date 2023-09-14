<script setup lang="ts">
import SearchCategories from '../../components/Custom/Results/SearchCategories.vue'
import HomeHeader from '@/components/Custom/Headers/HomeHeader.vue'

const searchCategoriesVisible: Ref<boolean> = ref(false)

const hanldeShowSeacrhCategories = (): void => {
  searchCategoriesVisible.value = !searchCategoriesVisible.value
}

const handleSaerchCategoryInputFocus = (): void => {
  searchCategoriesVisible.value = false
}
</script>

<template>
  <div class="bg-[#f1f1fc] space-y-4">
    <div>
      <HomeHeader
        :search-categories-visible="searchCategoriesVisible"
        @show-search-categories="hanldeShowSeacrhCategories"
        @search-category-input-focus="handleSaerchCategoryInputFocus"
        @catalogue-click="handleSaerchCategoryInputFocus"
      />
    </div>
    <hr>
    <div class="w-[100%] m-auto">
      <SearchCategories />
    </div>
  </div>
</template>

<style>
.btn {
  color: white;
  background-color: #2d4aae;
}
</style>
