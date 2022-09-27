<template>
  <div class="work">
    <div class="search">
      <SearchBar />
    </div>
    <div class="work-list">
      <TaskCard v-for="item in workList" :key="item._id" :item="item" :task_id="$route.query.id"/>
    </div>
    <TabBar @toggleTabbar="toggleTabbar" />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
const router = useRouter()
const $route = useRoute()
const store = useStore()
const toggleTabbar = (index) => {
  router.push({ name: 'Main', params: { index } })
}
const workList = computed(() => store.getters.taskList($route.query.id))
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.work {
  width: px2rem(375);
  height: 100vh;
  background-color: #f8f8fe;
  .search {
    position: fixed;
    top: 0;
    z-index: 3;
    width: px2rem(335);
    text-align: center;
    padding: 0 px2rem(20);
    background-color: #fff;
  }
  &-list {
    padding: 55px px2rem(20);

  }
}
</style>
