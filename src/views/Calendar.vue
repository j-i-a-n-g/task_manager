<template>
  <div class="calendar">
    <van-calendar
      :poppable="false"
      :show-title="false"
      :show-confirm="false"
      :style="{ height: '420px' }"
      @select="filtered"
    />
    <div class="task-card-list">
      <p>当天前需完成的工作</p>
      <div v-if="workList.length">
        <template v-for="item in workList" :key="item._id">
        <TaskCard :item="item" @deleteWork="deleteWork" />
      </template>
      </div>
      <span v-else>暂无工作安排</span>
    </div>
  </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
const store = useStore()
// 所有工作列表
const allWorkList = computed(() => store.getters.allWorkList)
const workList = ref(allWorkList.value.slice(0))
// 选择日期后触发的事件
const filtered = (val) => {
  workList.value = allWorkList.value.slice(0)
  const yy = val.getMonth() + 1
  const dd = val.getDate()
  allWorkList.value.forEach(item => {
    if (yy < item.deadline.slice(0, 2)) {
      return
    } else if (yy === parseInt(item.deadline.slice(0, 2)) && dd <= item.deadline.slice(3, 5)) return
    workList.value = workList.value.filter(val => {
      return val._id !== item._id
    })
  })
}
// 从数组中删除工作
const deleteWork = id => {
  workList.value = allWorkList.value.filter(item => {
    return item._id !== id
  })
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
  .calendar {
    background-color: #f8f8fe;
    ::v-deep .van-calendar__header-subtitle {
      padding: 10px 0;
      font-size: 16px;
    }
  }
  .task-card-list {
    margin-top: 15px;
    padding: 0 px2rem(20);
    p {
      font-size: 14px;
      padding-left: 10px;
      border-left: 4px solid grey;
      margin: 0;
    }
    span {
      font-size: 14px;
      color: grey;
      width: 100%;
    }
  }
</style>
