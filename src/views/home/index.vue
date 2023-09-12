<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import TabButton from '../../components/Custom/Buttons/TabButton.vue'
import HomeHeader from '../../components/Custom/Headers/HomeHeader.vue'
import SearchByBrand from './components/SearchByBrand.vue'
import HomeSeacrh from './components/HomeSearch.vue'

interface IButton {
  title: string
  isActive: boolean
  icon: string
}

const buttons: Ref<IButton[]> = ref([
  { title: 'Home', isActive: false, icon: 'fa-home' },
  { title: 'PC', isActive: false, icon: 'fa-car' },
  { title: 'LVC', isActive: false, icon: 'fa-truck' },
  { title: 'Motorcycle', isActive: false, icon: 'fa-motorcycle' },
  { title: 'CV', isActive: false, icon: 'fa-bus-simple' },
  { title: 'Tractor', isActive: false, icon: 'fa-tractor' },
  { title: 'Engine', isActive: false, icon: 'fa-gears' },
  { title: 'Axel', isActive: false, icon: 'fa-arrows-left-right' },
  { title: 'CV body type', isActive: false, icon: 'fa-van-shuttle' },
])

const isPersonal: Ref<boolean> = ref(true)
const isCommercial: Ref<boolean> = ref(true)
const currentButton: Ref<string> = ref('Home')
const smartSearch: Ref<string> = ref('')
const searchCategoriesVisible: Ref<boolean> = ref(false)

const handleClick = (button: IButton) => {
  if (
    button.title.toLocaleLowerCase() === 'pc'
    || button.title.toLocaleLowerCase() === 'lvc'
    || button.title.toLocaleLowerCase() === 'motorcycle'
  ) {
    isCommercial.value = false
    isPersonal.value = true
  }
  else if (
    button.title.toLocaleLowerCase() === 'cv'
    || button.title.toLocaleLowerCase() === 'tractor'
    || button.title.toLocaleLowerCase() === 'engine'
    || button.title.toLocaleLowerCase() === 'axel'
    || button.title.toLocaleLowerCase() === 'cv body type'
  ) {
    isCommercial.value = true
    isPersonal.value = false
  }
  else {
    isCommercial.value = true
    isPersonal.value = true
  }

  currentButton.value = button.title
}

const hanldeShowSeacrhCategories = (): void => {
  searchCategoriesVisible.value = !searchCategoriesVisible.value
}

const handleSaerchCategoryInputFocus = (): void => {
  searchCategoriesVisible.value = false
}

const handleCommercialVehcileClick = () => {
  isCommercial.value = true
  isPersonal.value = false
}

const handlePersonalVehcileClick = () => {
  isCommercial.value = false
  isPersonal.value = true
}

const handleSamrtSeach = () => {
  /**
   * @todo update logic for smart search
   */
}
</script>

<template>
  <div class="main">
    <!--
      <div class="home-btn">
      <el-button size="medium" class="btn">Home</el-button>
      </div>
    -->
    <div
      class="layout"
      @click.self="handleSaerchCategoryInputFocus"
    >
      <div>
        <HomeHeader
          :search-categories-visible="searchCategoriesVisible"
          @show-search-categories="hanldeShowSeacrhCategories"
          @search-category-input-focus="handleSaerchCategoryInputFocus"
          @catalogue-click="handleSaerchCategoryInputFocus"
        />
      </div>
      <div @click="handleSaerchCategoryInputFocus">
        <div class="tabs-buttons">
          <TabButton
            v-for="button in buttons"
            :key="button.title"
            :title="button.title"
            :icon="button.icon"
            :class="{ active: currentButton === button.title }"
            @update-vehicle-type="handleClick(button)"
          />
        </div>
        <div class="search-section mt-4">
          <div class="search-fields">
            <div class="grid-content blue-text">
              <div class="smart-search">
                <ElButton
                  class="btn p-1.5"
                  icon="search"
                >
                  Search
                </ElButton>
                <input
                  v-model="smartSearch"
                  type="text"
                  class="el-input mx-1 text-[#000]"
                  placeholder="Start typing..."
                >
              </div>
            </div>
            <div class="search-tabs">
              <HomeSeacrh
                :is-commercial="isCommercial"
                :is-personal="isPersonal"
              />
            </div>
            <div class="search-by-brand">
              <SearchByBrand />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  gap: 20px;
}
.home-btn {
    padding-left: 10px;
    padding-top: 10px;
}
.btn {
  color: white;
  background-color: #2d4aae;
}

.layout {
  background-color: #f1f1fc;
  padding: 10px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 0px;
}

.grid-content {
  border-radius: 4px;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.smart-search {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #86b7fd;
  border-radius: 4px;
  margin-left: -10px;
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
  height: 40px;
  border: none;
  padding: 0px 10px;
  border-right: 1px solid transparent;
  border-radius: 0px;

  &:focus {
    outline: none;
    border: none;
  }
}

.account {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.account-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.blue-text {
  color: #2d4aae;
  font-weight: 600;
}

.tabs-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
}

.search-section {
  display: block;
  flex-wrap: wrap;
  width: 100%;
}

.search-fields {
  width: 100%;
}

.search-by-brand {
  /* padding: 10px; */
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 8px 6px -6px rgb(226, 224, 224);
}
</style>
