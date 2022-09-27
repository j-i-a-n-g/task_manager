import { createStore } from 'vuex'

export default createStore({
  state: {
    userMessage: {},
    taskBoxArr: []
  },
  getters: {
    // 找到对应任务箱子下的工作列表
    taskList: (state, getters) => (id) => {
      const result = state.taskBoxArr.find(item => {
        return item._id === id
      })
      return result.taskList
    },
    // 所有的工作列表
    allWorkList: (state) => {
      const workList = []
      state.taskBoxArr.forEach(item => {
        workList.push(...item.taskList)
      })
      return workList
    }
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
    },
    // 修改工作的任务状态
    changeWorkState (state, { work_id, checked, task_id }) {
      state.taskBoxArr.map(item => {
        if (item._id === task_id) return item
        item.taskList.forEach(item => {
          if (item._id !== work_id) return item
          item.finish = checked
        })
        return item
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
