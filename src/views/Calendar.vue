<template>
  <div class="calendar">
    <van-calendar
      :poppable="false"
      :show-title="false"
      :show-confirm="false"
      :style="{ height: '420px' }"
    />
    <div class="task-card-list">
      <TaskCard />
    </div>
  </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
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
  }
</style>
