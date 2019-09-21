import React, { Component } from 'react';
import ChildThree from './ChildThree';
import { Button } from 'antd';
export default class ChildOne extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '我是子组件一号'
    }
  }
  setTitle () {
    this.setState({
      title: '我是新的标题'
    })
  }
  render () {
    console.log('compoonent props', this.props);
    return (
      <div style={{ background: '#fff', padding: '30px', margin: '20px', color: '#333' }}>
        {this.state.title} 欢迎语：{this.props.title}
        <Button type="primary" onClick={() => this.props.change()}>
          修改标题
        </Button>
        <ChildThree title={this.props.title}></ChildThree>
      </div>
    );
  }
}