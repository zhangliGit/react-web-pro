
import $ajax from '../utils/ajax-serve'
import apiList from '../api/index'

/**
 * @description 当前模块接口列表
 * @param {url} 功能接口
 * @param {type} 请求类型
 * @param {params} 请求参数
 */
const actions = Object.create(null)
for (const key in apiList) {
  const url = apiList[key].split('#')[0]
  const type = apiList[key].split('#')[1]
  const isLoad = apiList[key].split('#')[2] === undefined
  actions[key] = function *({ params = {} }, { call, put }) {
    // 是否显示加载提示
    const reqType = type === 'getUrl' ? 'get' : type
    const isGetUrl = type === 'getUrl'
    const paramsObj = { 
      url: isGetUrl || type === 'del' ? url + '/' + params : url,
      params: isGetUrl ? {} : params
    }
    if (isLoad) {
      paramsObj.isLoad = isLoad
    }
    const res = yield call($ajax[reqType], paramsObj);
    return new Promise((resolve, reject) => {
      if (res.code === 200 || res.status === true) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  }
}

const projectName = 'antd' // 此处写项目名作为存储值，避免不同项目冲突
const localData = window.localStorage.getItem(projectName) || '{}'
const getState = (state, val) => {
  return JSON.parse(localData)[state] || val
}

const HomeModel = {
  namespace: 'home',
  state: {
    userInfo: getState('userInfo', {
      userName: 'antd-design-vue'
    }),
    name: 'react',
  },
  // 异步处理方法
  effects: {
    ...actions
  },
  subscriptions: {
  },
  reducers: {
    // 设置全局state状态值
    updataState (state: any, { isLocal = true, params }) {
      if (isLocal) {
        const localData = JSON.parse(localStorage.getItem(projectName) || '{}')
        localData[params.key] = params.data
        window.localStorage.setItem(projectName, JSON.stringify(localData))
      }
      return {
        ...state,
        [params.key]: params.data
      }
    }
  },
  subscriptions: {},
};

export default HomeModel