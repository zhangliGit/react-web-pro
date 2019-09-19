/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

const homeApi = {
  getIndex: 'http://192.168.2.247:3000/mock/40/getTable#post', // 获取数据列表
  getDetail: 'http://192.168.2.247:3000/mock/40/detail#get' // 获取详情
}

export default homeApi
