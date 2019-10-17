/**
 * @description 封装http请求功能
 * @author zhangli
 */

import axios from 'axios'
import qs from 'qs'
import { Modal, message } from 'antd';

let loading
message.config({
  maxCount: 1
})

// 请求超时时间
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true // 让ajax携带cookie

// 拦截请求
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 拦截响应
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

const showToast = (tip = '') => {
  loading = message.loading('数据处理中...', 0);
}

// 处理响应结果
function responseRes(res) {
  // 清除加载
  setTimeout(loading, 0)
    if (res.code === 200 || res.status === true) {
      return res
    } else if (res.code === 401) {
      Modal.warning({
        title: '提示',
        okText: '确定',
        content: '认证过期，请重新登录',
        onOk: function () {
        }
      })
    } else {
      Modal.warning({
        title: '提示',
        content: res.message
      })
      return res
    }
}
const $ajax = {
  async get(obj) {
    if (obj.isLoad) showToast()
    try {
      let res = await axios.get(obj.url, {
        params: obj.params || ''
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async postForm(obj) {
    if (obj.isLoad) showToast()
    try {
      let res = await axios.post(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async post(obj) {
    if (obj.isLoad) showToast()
    try {
      let res = await axios({
        url: obj.url,
        method: 'post',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  }
}

export default $ajax
