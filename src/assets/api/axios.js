import axios from 'axios'
import { Toast } from 'vant'

const createAxios = (TYPE, URL, DATA, PARAMs, res, rej) => {
  axios({
    method: TYPE,
    url: URL,
    data: DATA,
    params: PARAMs
  }).then(({ data }) => {
    console.log(data)
    if (!data.code) {
      if (data.message) {
        Toast(data.message)
      }
    } else {
      if (data.message) {
        Toast.success(data.message)
      }
    }
    res(data)
  }).catch(err => {
    rej(err)
  })
}

export default (TYPE, URL, DATA) => {
  return new Promise((resolve, reject) => {
    if (TYPE.toLowerCase() === 'get') {
      createAxios(TYPE, URL, {}, DATA, resolve, reject)
    } else {
      createAxios(TYPE, URL, DATA, {}, resolve, reject)
    }
  })
}
