<template>
  <div class="main">
    <keep-alive>
      <component :is="currentComponent" class="main-view"></component>
    </keep-alive>
    <TabBar @toggleTabbar="toggleTabbar" />
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import TabBar from '@/components/TabBar.vue'
import Agent from './Agent.vue'
import Calendar from '@/views/Calendar.vue'
import Stats from './Stats.vue'
import My from './My.vue'
const currentComponent = ref(markRaw(Agent))
const activeIndex = ref(0)
const toggleTabbar = (index) => {
  activeIndex.value = index
  switch (index) {
    case 0:
      currentComponent.value = markRaw(Agent)
      break
    case 1:
      currentComponent.value = markRaw(Calendar)
      break
    case 2:
      currentComponent.value = markRaw(Stats)
      break
    case 3:
      currentComponent.value = markRaw(My)
      break
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: absolute;
  .main-view {
    flex-grow: 1;
    margin-bottom: 50px;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>
