<template>
  <div class="work">
    <div class="search">
      <SearchBar />
    </div>
    <div class="work-list">
      <TaskCard
        v-for="item in workList"
        :key="item._id"
        :item="item"
        :task_id="$route.query.id"
        @deleteWork="deleteWork"
      />
    </div>
    <van-empty description="还没有加入任务" v-if="!workList.length">
    </van-empty>
    <TabBar  />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'

const $route = useRoute()
const store = useStore()
const taskWorkList = computed(() => store.getters.taskList($route.query.id))
const workList = ref(taskWorkList.value.slice(0))
// 从数组中删除工作
const deleteWork = id => {
  workList.value = taskWorkList.value.filter(item => {
    return item._id !== id
  })
}
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
