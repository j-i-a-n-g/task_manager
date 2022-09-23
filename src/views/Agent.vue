<template>
  <div class="agent">
    <van-search placeholder="搜索任务名称" @focus="RouteToSearch"/>
    <div class="agent-list">
      <div class="agent-list-item" v-for="(item, index) in taskBoxList" :key="index" :style="{backgroundColor: item.rgba}">
        <div class="agent-list-item-icon" :style="{backgroundColor: item.choosedColor}">
          <van-icon name="chat-o" color="#fff" />
        </div>
        <div class="agent-list-item-content">
          <p :style="{color: item.choosedColor}">{{item.taskName}}</p>
          <span>{{item.taskList.length}}</span>
        </div>
      </div>

      <div class="agent-list-add" @click="addTaskBox">
        <van-icon name="plus" color="#333" size="20" />
        <span>添加任务箱</span>
      </div>
    </div>
    <TaskBox :show="show" @hidePopup="hidePopup" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import TaskBox from '@/components/TaskBox.vue'
import { getTaskBoxList } from '@/assets/api/index'
import { computed, onMounted, ref, watch } from 'vue'
const router = useRouter()
const store = useStore()
const RouteToSearch = function () {
  router.push({ path: '/search', name: 'Search' })
}
// 任务箱的数组
const taskBoxList = ref([])
onMounted(async () => {
  const { data } = await getTaskBoxList()
  const newTaskList = data.map(item => {
    item.rgba = item.choosedColor.slice(0, 3) + 'a' + item.choosedColor.slice(3, -1) + ',.3' + item.choosedColor.slice(-1)
    return item
  })
  store.commit('saveTaskBox', newTaskList)
  taskBoxList.value = newTaskList
  console.log(newTaskList)
})
const show = ref(false)
const addTaskBox = function () {
  show.value = true
}
const hidePopup = function () {
  show.value = false
}
const taskBoxArr = computed(() => {
  return store.state.taskBoxArr
})
watch(taskBoxArr, (val) => {
  taskBoxList.value = val
})

</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
.agent {
  width: px2rem(375);
  padding: 0 px2rem(20);
  box-sizing: border-box;
  ::v-deep .van-search {
    border-bottom: 1px solid #ccc;
    width: px2rem(335);
    position: fixed;
    top: 0;
    z-index: 2;
      .van-search__content {
      padding: 0;
      border-radius: 10px;

      .van-field__left-icon {
        margin-left: 10px;
      }
    }
      .van-search__field {
      background-color: #f2f2f2;
      border-radius: 10px;

    }
  }
  &-list {
    padding-top: 55px;
    width: 100%;
    // height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
      padding: 15px;
      width: px2rem(162);
      height: px2rem(130);
      border-radius: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      position: relative;
      &-icon {
        width: px2rem(48);
        height: px2rem(48);
        border: 2px solid #fff;
        border-radius: 8px;
        text-align: center;
        line-height: px2rem(48);
        ::v-deep van-icon {
        position: absolute;
        top: 0;
        left: 0;
      }
      }
      &-content {
        display: flex;
        justify-content: space-between;
        width: px2rem(132);
        position: absolute;
        bottom: 15px;
        font-size: 16px;
        align-items: center;
        p {
          margin: 0;
        }
      }

    }

    &-add {
      width: px2rem(162);
      height: px2rem(64);
      background-color: #f2f2f2;
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      span {
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>
