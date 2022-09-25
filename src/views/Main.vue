<template>
  <div class="main">
    <keep-alive>
      <component :is="currentComponent" class="main-view"></component>
    </keep-alive>
    <TabBar @toggleTabbar="toggleTabbar" />
  </div>
</template>

<script setup>
import { ref, markRaw, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { autoLogin } from '@/assets/api/index'
import TabBar from '@/components/TabBar.vue'
import Agent from './Agent.vue'
import Calendar from '@/views/Calendar.vue'
import Stats from './Stats.vue'
import My from './My.vue'
const router = useRouter()
const store = useStore()
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
// 页面刚生成时
onMounted(async () => {
  // 如果tag有值，则说明是浏览器URL访问过来的，需进行自动登录
  if (router.currentRoute.value.params.tag) {
    // 自动登录
    const result = await autoLogin()
    store.commit('saveUserMessage', result.data)
  }
})
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
