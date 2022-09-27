<template>
  <div class="add-work">
    <NavBar title="工作" />
    <div class="add-work-name">
      <p>任务名称</p>
      <van-cell-group inset>
        <van-field v-model="workName" placeholder="请输入任务名称" />
      </van-cell-group>
    </div>
    <div class="add-work-desc">
      <p>任务描述</p>
      <van-cell-group inset>
        <van-field
          v-model="workMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入描述......"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="add-work-option">
      <van-field
        v-model="topic"
        is-link
        readonly
        name="picker"
        placeholder="请选择所属任务箱"
        @click="showPicker1 = true"
      />
      <!-- 截止日期 -->
      <van-popup v-model:show="showPicker1" position="bottom">
        <van-picker
          :columns="topic1"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        v-model="date"
        is-link
        readonly
        name="picker"
        placeholder="请选择工作截止日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model:show="showCalendar" @confirm="onConfirm2" />
      <!-- 截止时间 -->
      <van-field
        v-model="time"
        is-link
        readonly
        name="datetimePicker"
        placeholder="点击选择工作截止时间"
        @click="showPicker3 = true"
      />
      <van-popup v-model:show="showPicker3" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm3"
          @cancel="showPicker3 = false"
        />
      </van-popup>
      <!-- 工作难度 -->
      <van-field
        v-model="degree"
        is-link
        readonly
        name="picker"
        placeholder="请选择工作难易程度"
        @click="showPicker4 = true"
      />
      <van-popup v-model:show="showPicker4" position="bottom">
        <van-picker
          :columns="degree1"
          @confirm="onConfirm4"
          @cancel="showPicker4 = false"
        />
      </van-popup>
    </div>
    <van-button color="#666ee8" block @click="submitWorkDetail"
      >保存</van-button
    >
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { postWorkDetail } from '@/assets/api/index'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()
const $route = useRoute()
const workName = ref('')
const workMessage = ref('')
const showPicker1 = ref(false)
const showCalendar = ref(false)
const showPicker3 = ref(false)
const showPicker4 = ref(false)
const topic = ref('')
const date = ref('')
const time = ref('')
const degree = ref('')
const topic1 = ref([])
const degree1 = ['简单', '一般', '困难', '超难', '重要']
// 如果是通过route id传入搜寻出结果，则用该变量接收
const editWork = ref({})

const onConfirm1 = (value) => {
  topic.value = value
  showPicker1.value = false
}
const onConfirm2 = (val) => {
  date.value = `${val.getMonth() + 1}/${val.getDate()}`
  showCalendar.value = false
}
const onConfirm3 = (value) => {
  time.value = value
  showPicker3.value = false
}
const onConfirm4 = (value) => {
  degree.value = value
  showPicker4.value = false
}
// vuex中获取所有工作列表
const workList = computed(() => store.getters.allWorkList)
onMounted(async () => {
  // 准备所属任务箱的名字列表
  const taskNameArr = []
  store.state.taskBoxArr.forEach((item) => {
    return taskNameArr.push(item.taskName)
  })
  topic1.value = taskNameArr
  // 如果query有携带id，则发起请求
  if ($route.query.id) {
    editWork.value = workList.value.find(item => {
      return item._id === $route.query.id
    })
    // 拆解截止时间
    const timeArr = editWork.value.deadline.split(' ')
    date.value = timeArr[0].replace('-', '/')
    time.value = timeArr[1]
    workName.value = editWork.value.workName
    workMessage.value = editWork.value.workMessage
    topic.value = editWork.value.taskType
    deadline.value = editWork.value.deadline
    degree.value = editWork.value.degree
  }
})
// 收集需要提交的数据
const taskDetail = ref({})
// 提交工作详细信息
const submitWorkDetail = async () => {
  const taskObj = store.state.taskBoxArr.find((item) => {
    return item.taskName === topic.value
  })
  taskDetail.value = {
    workName: workName.value,
    workMessage: workMessage.value,
    taskType: topic.value,
    deadline: deadline.value,
    degree: degree.value,
    id: taskObj._id,
    work_id: $route.query.id || null
  }
  await postWorkDetail(taskDetail.value)
  router.push('/')
}
// 将工作截止时间通过计算属性传入后端
const deadline = computed(() => {
  const datearr = date.value.split('/')
  const addZero = []
  datearr.forEach(item => {
    if (item >= 10 || item.length === 2) {
      return addZero.push(item)
    }
    addZero.push('0' + item)
  })
  return addZero.join('-') + ' ' + time.value
})
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.add-work {
  width: 100%;
  height: 100vh;
  padding: 0 px2rem(20);
  background-color: $bgColor;
  box-sizing: border-box;
  &-name {
    p {
      font-size: 14px;
    }
  }
  &-desc {
    p {
      font-size: 14px;
    }
  }
  &-option {
    margin-top: 50px;
  }
  ::v-deep .van-cell-group {
    margin: 0;
  }
  ::v-deep .van-button {
    position: fixed;
    bottom: 50px;
    width: px2rem(335);
  }
}
</style>
