import $ajax from '../../utils/ajax-serve';
import homeApi from '../api';

let userInfo = window.localStorage.getItem('userInfo');
const store = {
  userInfo: userInfo ? JSON.parse(userInfo) : {},
};

/**
 * @description 处理请求成功后返回Promise方便vue界面处理数据
 * @param {res} 返回结果
 */
function resultBack(res) {
  return new Promise(resolve => {
    resolve(res)
  })
}
/**
 * @description 当前模块接口列表
 * @param {url} 功能接口
 * @param {type} 请求类型
 * @param {params} 请求参数
 */
const actions = Object.create(null)
for (const key in homeApi) {
  const url = homeApi[key].split('#')[0]
  const type = homeApi[key].split('#')[1]
  actions[key] = async function (params = {}) {
    // 是否显示加载提示
    const isLoad = homeApi[key].split('#')[2] === undefined
    let reqType = type === 'getUrl' ? 'get' : type
    const isGetUrl = type === 'getUrl'
    const res = await $ajax[reqType]({
      url: isGetUrl || type === 'del' ? url + '/' + params : url,
      params: isGetUrl ? {} : params
    }, isLoad)
    return resultBack(res)
  }
}
export { actions , store };
