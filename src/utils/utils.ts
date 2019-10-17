/**
 * @description 全局的功能函数
 */

import { Modal } from 'antd'
const Tools = {
  // 获取日期时间
  getDateTime(val, type = 'dateTime') {
    const d = new Date(val)
    let date =  d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' +
          d.getMinutes()) +
        ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      if (type === 'date') {
        return date.substring(0, 10)
      } else if (type === 'time') {
        return date.substring(11, 16)
      } else {
        return date
      }
  },
  // 设置table滚动高度
  setScroll (id: any) {
    if (document.getElementById(id)) {
      return document.getElementById(id).offsetHeight - 55
    }
    return false
  },
  // 延迟处理方法
  goNext: (fn:any) => {
    setTimeout(() => {
      fn()
    }, 1200)
  },
  // 删除提示
  delTip (tip : string, fn:any) {
    const title = tip || '您确定删除吗?';
    Modal.confirm({
      title,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        fn()
      }
    })
  },
  // 表单回填
  fillForm (autoForm: any, record:any) {
    return autoForm.map((item : any) => {
      var initValue
      initValue = record[item.value] || ''
      if (item.type === 'rangeTime') {
        initValue = [record.startTime, record.endTime]
      }
      return {
        ...item,
        initValue: initValue
      }
    })
  }
}

export default Tools
