<template>
    <div class="task-card" @click="editTask(item)">
        <van-checkbox
          v-model="checked"
          shape="square"
          checked-color="rbga(102, 110, 232)"
          @click.stop="checkedTask(item._id)"
        ></van-checkbox>
        <div class="task-card-content">
          <p>{{item.workName}}</p>
          <span>{{item.workMessage}}</span>
        </div>
        <div class="task-card-time">
          <span>{{item.deadline}}</span>
        </div>
      </div>
</template>

<script setup>
import { Toast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { changeWorkState } from '@/assets/api/index'
const store = useStore()
const router = useRouter()
// 工作卡片展示的数据
const props = defineProps(['item', 'task_id'])
// 切换选中框状态
const checked = ref(false)
onMounted(() => {
  checked.value = props.item.finish
})
// 设置防抖
const prev = ref(0)
const checkedTask = async (id) => {
  const delay = 2000
  const now = Date.now()
  if (now - prev.value < delay) {
    Toast('请勿频繁操作')
  } else {
    checked.value !== true
    prev.value = now
    store.commit('changeWorkState', { work_id: id, checked: checked.value, task_id: props.task_id })
    await changeWorkState({ id, finish: checked.value })
  }
}
// 点击进入编辑页面
const editTask = (item) => {
  router.push({
    name: 'AddWork',
    query: {
      id: item._id
    // workName: item.workName,
    // workMessage: item.workMessage,
    // taskType: item.taskType,
    // degree: item.degree,
    // deadline: item.deadline
    }
  })
}
</script>

<style lang="scss" scoped>
.task-card {
      background-color: #fff;
      height: 72px;
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 10px 0;
      padding-left: 20px;
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
        margin-left: 20px;
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
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #aaa;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 12px;
      }
    }
</style>
