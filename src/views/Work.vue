<template>
  <div class="work">
    <div class="search">
      <SearchBar />
    </div>
    <div class="work-list">
      <TaskCard />
    </div>
    <TabBar @toggleTabbar="toggleTabbar" />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toggleTabbar = (index) => {
  router.push({ name: 'Main', state: { index: index } })
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
