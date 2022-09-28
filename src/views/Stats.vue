<template>
  <div class="stats">
    <!-- 本周任务情况 -->
    <p class="stats-title">统计</p>
    <div class="stats-situation">
      <span>本周完成任务情况</span>
      <div class="stats-situation-echarts" id="situation" ref="situation"></div>
    </div>
    <!-- 任务紧急程度 -->
    <div class="stats-urgent">
      <span>完成任务难度情况</span>
      <div class="stats-urgent-echarts" ref="urgent"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref } from 'vue'
import { useStore } from 'vuex'
const { onMounted, computed } = require('@vue/runtime-core')
const store = useStore()
// 使用ref创建虚拟DOM引用
const situation = ref()
const urgent = ref()
let workList = ref([])
workList = computed(() => store.getters.allWorkList)
// 将工作列表的数据根据任务难度情况划分为五个数组
// 简单
const simple = ref(0)
const general = ref(0)
const difficult = ref(0)
const hard = ref(0)
const important = ref(0)
onMounted(() => {
  sortingWorkType(workList.value)
  situationEchartsInit()
  urgentEchartsInit()
})
// 根据任务难度分开为五个数组
const sortingWorkType = (arr) => {
  arr.forEach(item => {
    switch (item.degree) {
      case '简单':
        simple.value++
        break
      case '一般':
        general.value++
        break
      case '困难':
        difficult.value++
        break
      case '超难':
        hard.value++
        break
      case '重要':
        important.value++
        break
    }
  })
  console.log(simple.value, general.value, difficult.value, hard.value, important.value)
}
// 初始化本周完成任务情况的折线图
const situationEchartsInit = () => {
  const myEcharts = echarts.init(situation.value)
  const options = {
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [3, 2, 0, 4, 1, 1, 3],
        type: 'line',
        smooth: true
      }
    ]
  }
  myEcharts.setOption(options)
}
// 初始化完成任务难度情况的饼状图
const urgentEchartsInit = () => {
  const myEcharts = echarts.init(urgent.value)
  const options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'center',
      right: '15%',
      width: '50'
    },
    series: [
      {
        name: '统计结果',
        type: 'pie',
        right: '40%',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: simple.value, name: '简单' },
          { value: general.value, name: '一般' },
          { value: difficult.value, name: '困难' },
          { value: hard.value, name: '超难' },
          { value: important.value, name: '重要' }
        ]
      }
    ]
  }
  myEcharts.setOption(options)
}
</script>

<style lang="scss" scoped>
.stats {
  width: 100%;
  span {
    font-size: 14px;
    color: #999;
    margin-left: 20px;
  }
  &-situation {
    width: 100%;
    &-echarts {
      height: 240px;
    }
  }
  &-urgent {
    width: 100%;
    &-echarts {
      height: 240px;
    }
  }
  &-title {
    font-size: 20px;
    margin: 10px auto;
    text-align: center;
    color: #444;
  }
}
</style>
