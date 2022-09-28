import { createStore } from 'vuex'

export default createStore({
  state: {
    userMessage: {},
    taskBoxArr: [],
    // 底部切换栏对应的index
    activeIndex: 3
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
    // 修改底部切换栏的index
    setTabBarIndex: (state, index) => {
      state.activeIndex = index
    },
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
    // 修改工作的任务状态或者收藏情况
    changeWorkState (state, { work_id, checked, collect, task_id }) {
      state.taskBoxArr.map(item => {
        if (item._id === task_id) return item
        item.taskList.forEach(item => {
          if (item._id !== work_id) return item
          item.finish = checked
          item.collect = collect
        })
        return item
      })
    },
    // 修改用户名
    reviseUsername (state, val) {
      state.userMessage.username = val
    },
    // 删除工作
    deleteWork (state, id) {
      state.taskBoxArr = state.taskBoxArr.filter(item => {
        return item._id !== id
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
