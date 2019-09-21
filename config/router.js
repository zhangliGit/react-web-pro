/***
 * @description 路由配置
 * @remark 路由对应菜单中文名称需要在src/locals/zh-CN/menu.ts中配置（后续再调整）
 */


const routerList = [
  {
    path: '/form',
    icon: 'smile',
    name: 'form',
    routes: [{
        path: '/form/submitForm',
        name: 'submitForm',
        icon: 'smile',
        component: './form/SubmitForm',
      }
    ],
  }
]

export default routerList