import { createStore } from 'vuex'

export default createStore({
  state: {
    taskBoxArr: []
  },
  getters: {
  },
  mutations: {
    // 保存任务箱数据
    saveTaskBox (state, val) {
      state.taskBoxArr = val
    },
    // 添加任务箱
    addTaskBox (state, val) {
      state.taskBoxArr.push(val)
    }
  },
  actions: {
  },
  modules: {
  }
})
