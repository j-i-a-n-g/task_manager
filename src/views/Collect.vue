<template>
  <div class="collect">
    <NavBar title="我的收藏" />
    <div class="collect-list">
      <TaskCard v-for="item in collectWorkList" :key="item._id" :item="item" @deleteWork="deleteWork" />
    </div>
    <van-empty description="暂无收藏" v-if="!collectWorkList.length">
    </van-empty>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
const store = useStore()
const allWorkList = computed(() => store.getters.allWorkList)
const collectWorkList = allWorkList.value.filter(item => item.collect)
// 从数组中删除工作
const deleteWork = id => {
  collectWorkList.value = allWorkList.value.filter(item => {
    return item._id !== id
  })
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.collect {
  width: 100%;
  height: 100vh;
  background-color: $bgColor;
  margin-top: 46px;
  &-list {
    padding: 10px px2rem(20) 0;
  }
}
</style>
