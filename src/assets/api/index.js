import axios from './axios'

const url = '/node'

export const postTaskBox = (data) => axios('post', url + '/taskbox/posttask', data)

export const getTaskBoxList = () => axios('get', url + '/taskbox/getTaskList')
