import { createStore } from 'vuex'

export default createStore({
  state: {
    userMessage: {},
    taskBoxArr: []
  },
  getters: {
  },
  mutations: {
    // 保存用户信息:
    saveUserMessage (state, val) {
      state.userMessage = val
    },
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
