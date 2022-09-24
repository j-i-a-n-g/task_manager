<template>
    <div class="task-card">
        <van-checkbox
          v-model="checked"
          shape="square"
          checked-color="rbga(102, 110, 232)"
          @click="checkedTask"
        ></van-checkbox>
        <div class="task-card-content">
          <p>任务名称</p>
          <span>这是一段任务描述</span>
        </div>
        <div class="task-card-time">
          <span>09-17 12:08</span>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue'
// 切换选中框状态
const checked = ref(true)
const checkedTask = () => {
  console.log(checked.value)
  checked.value = !checked.value
}
</script>

<style lang="scss" scoped>
.task-card {
      background-color: #fff;
      height: 72px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px 0;
      position: relative;
      border-radius: 10px;
      box-shadow: 0 0 0px 1px rgba(102, 110, 232);
      &:before {
        content: '';
        display: inline-block;
        height: 25px;
        border: 2px solid rgba(102, 110, 232);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 14px;
          margin: 0;
        }
        span {
          font-size: 12px;
          color: #ccc;
          margin-top: 5px;
        }
      }
      &-time {
        background-color: #aaa;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 12px;
        margin-bottom: 40px;
        margin-left: 50px;
      }
    }
</style>
