<template>
  <div class="task-box">
    <van-popup v-model:show="isShow" @click-overlay="hidePopup">
      <p class="title">添加任务栏</p>
      <van-cell-group inset>
        <van-field
        v-model.trim="taskName"
        placeholder="请输入任务名称"
        :rules="[{ required: true, message: '内容不能为空' }]"
        />
      </van-cell-group>
      <!-- 可选颜色 -->
      <div class="task-box-color">
        <ul>
          <li v-for="(item, index) in colorArr" :key="index">
            <div :style="{backgroundColor: item}" @click="selectColor(item)"></div>
          </li>
        </ul>
      </div>
      <!-- 选中的颜色 -->
      <div class="choosedColor">
        <p>已选：</p>
        <span :style="{backgroundColor: choosedColor}"></span>
      </div>
      <div class="task-box-btn">
        <van-button type="default" @click="hidePopup">取消</van-button>
      <van-button type="default" style="color: #666ee8" @click="submitTask">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Toast } from 'vant'
import { postTaskBox } from '@/assets/api/index'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps(['show'])
const isShow = ref(false)
const emits = defineEmits(['hidePopup'])
const colorArr = [
  'rgb(102, 110, 232)',
  'rgb(40, 208, 148)',
  'rgb(255, 199, 28)',
  'rgb(249, 94, 90)',
  'rgb(30, 159, 242)',
  'rgb(255, 153, 153)',
  'rgb(182, 182, 182)',
  'rgb(153, 51, 153)',
  'rgb(51, 255, 153)',
  'rgb(0, 102, 255)',
  'rgb(0, 204, 255)',
  'rgb(255, 204, 255)'
]
const hidePopup = function () {
  emits('hidePopup', false)
}
// 任务名称
const taskName = ref('')
const choosedColor = ref('rgb(102, 110, 232)')
// 任务箱子的颜色
const selectColor = function (item) {
  choosedColor.value = item
}
// 提交任务箱
const submitTask = async function () {
  const data = {
    choosedColor: choosedColor.value,
    taskName: taskName.value
  }
  if (!data.taskName) return Toast('任务箱名称不能为空')
  const result = await postTaskBox(data)
  if (!result.code) return
  taskName.value = ''
  choosedColor.value = 'rgb(102, 110, 232)'
  result.data.rgba = result.data.choosedColor.slice(0, 3) + 'a' + result.data.choosedColor.slice(3, -1) + ',.3' + result.data.choosedColor.slice(-1)
  store.commit('addTaskBox', result.data)
  hidePopup()
}
watch(() => props.show, (val) => {
  isShow.value = val
})
</script>

<style lang="scss" scoped>
  .task-box {
    ::v-deep .van-popup--center {
      width: 300px;
      height: 260px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 16px;
        margin-top: 0;
      }
      .van-cell-group--inset {
        width: 90%;
        margin: 0;
        border: 1px solid #ccc;
        border-radius: 0;
        .van-cell {
          padding: 0;
          margin: 5px;
        }
      }
      .task-box-color {
        width: 100%;
        ul {
          display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        li {
          width: 16.6%;
          height: 30px;
          margin-top: 10px;
          div {
            width: 20px;
            height: 20px;
            margin: 0 auto;
            border-radius: 50%;
            flex: 0 0 20%;
          }
        }
        }

      }
      .task-box-btn {
        width: 100%;
        display: flex;
        position: fixed;
        bottom: 0;
        button {
          width: 50%;
        }
      }
      .choosedColor {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        p {
          font-size: 16px;
          margin: 0;
        }
        span {
          display: block;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
