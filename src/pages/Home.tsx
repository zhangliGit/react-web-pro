import React, { Component } from 'react'
import { Input, Button } from 'antd'
import ChildOne from './ChildOne'
import ChildTwo from './ChildTwo'
import styles from './home.less'
import { actions } from './store/index'

export default class Home extends Component {
  constructor (props: any) {
    super(props)
    this.state = {
      msg: '我是左边区域',
      title: 'hello world'
    }
  }
  async componentDidMount () {
  }
  changeTitle (e:any) {
    this.setState({
      title: e.target.value
    })
  }
  changeMsg = () => {
    this.setState({
      msg: '我被更新了'
    })
  }
  changeChild = () => {
    this.refs.childOne.setTitle();
  }
  render () {
    console.log('router props', this.props);
    const { title, msg } = this.state;
    return (
      <div className="qui-fx">
        <div
          className={`qui-fx-f1 ${styles['bg-1']}`}
          style={{ padding: '20px', color: '#fff', lineHeight: '24px' }}
        >
          <div>{msg}</div>
          <Button type="primary" onClick={() => this.changeChild()}>改变子组件标题</Button>
          <Input value={title} onChange={evt => this.changeTitle(evt)}></Input>
          <ChildOne ref="childOne" change={this.changeMsg} title={title}></ChildOne>
        </div>
        <div
          className={`qui-fx-f1 ${styles['bg-2']}`}
          style={{ marginLeft: '10px', padding: '20px', lineHeight: '24px' }}
        >
          <div>右边区域</div>
          <ChildTwo></ChildTwo>
        </div>
      </div>
    );
  }
}
