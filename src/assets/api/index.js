import axios from './axios'

const url = '/node'

export const postTaskBox = (data) => axios('post', url + '/taskbox/posttask', data)

export const getTaskBoxList = () => axios('get', url + '/taskbox/getTaskList')

export const userLogin = (val) => axios('post', url + '/user/login', val)

// 自动登录
export const autoLogin = () => axios('post', url + '/user/autologin')

// 退出登录
export const userLogout = () => axios('post', url + 'user/logout')
