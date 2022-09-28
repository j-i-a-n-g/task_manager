<template>
  <div class="agent">
    <div class="search">
      <SearchBar />
    </div>
    <div class="agent-list">
      <div
        class="agent-list-item"
        v-for="(item, index) in taskBoxList"
        :key="index"
        :style="{ backgroundColor: item.rgba }"
        @click="goToWork(item)"
      >
        <div
          class="agent-list-item-icon"
          :style="{ backgroundColor: item.choosedColor }"
        >
          <van-icon name="more-o" size="30" color="#fff" />
        </div>
        <div class="agent-list-item-content">
          <p :style="{ color: item.choosedColor }">{{ item.taskName }}</p>
          <span>{{ item.taskList.length }}</span>
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
import SearchBar from '@/components/SearchBar.vue'
import { getTaskBoxList } from '@/assets/api/index'
import { computed, onMounted, ref, watch } from 'vue'
const router = useRouter()
const store = useStore()
// 任务箱的数组
const taskBoxList = ref([])
// 组件生成时从vuex获取数据或发起数据请求
onMounted(async () => {
  const { data } = await getTaskBoxList()
  const newTaskList = data.map((item) => {
    item.rgba =
      item.choosedColor.slice(0, 3) +
      'a' +
      item.choosedColor.slice(3, -1) +
      ',.3' +
      item.choosedColor.slice(-1)
    return item
  })
  store.commit('saveTaskBox', newTaskList)
  taskBoxList.value = newTaskList
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
// 点击任务箱，跳转到工作列表页面
const goToWork = (item) => {
  router.push({ name: 'Work', query: { id: item._id } })
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.agent {
  width: px2rem(375);
  padding: 0 px2rem(20);
  background-color: $bgColor;
  box-sizing: border-box;
  .search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: px2rem(375);
  }
  &-list {
    padding-top: 55px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #f8f8fe;
    &-item {
      padding: 15px;
      width: px2rem(162);
      height: px2rem(130);
      border-radius: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      position: relative;
      &-icon {
        width: px2rem(40);
        height: px2rem(40);
        border: 2px solid #fff;
        border-radius: 8px;
        text-align: center;
        line-height: px2rem(40);
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
