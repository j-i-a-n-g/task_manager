import axios from './axios'

const url = '/node'

export const postTaskBox = (data) => axios('post', url + '/taskbox/posttask', data)

export const getTaskBoxList = () => axios('get', url + '/taskbox/getTaskList')

export const userLogin = (val) => axios('post', url + '/user/login', val)

// 自动登录
export const autoLogin = () => axios('post', url + '/user/autologin')

// 退出登录
export const userLogout = () => axios('post', url + 'user/logout')

// 填写工作内容，提交
export const postWorkDetail = (taskDetail) => axios('post', url + '/work/submitWork', taskDetail)

// 修改工作的完成状态
export const changeWorkState = (data) => axios('post', url + '/work/finishState', data)

// 修改工作的收藏状态
export const collectWork = (data) => axios('post', url + '/work/collectState', data)

// 删除工作
export const deleteWrokById = (data) => axios('post', url + '/work/deleteWork', data)

// 根据搜索关键字获取工作列表
export const searchWork = (data) => axios('post', url + '/work/search', data)

// 修改用户名
export const reviseUserName = (data) => axios('post', url + '/user/username', data)
