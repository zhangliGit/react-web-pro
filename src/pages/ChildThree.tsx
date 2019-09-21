import React, { Component } from 'react';

export default class ChildThree extends Component {
  render() {
    return (
      <div style={{background: '#000', padding: '30px', margin: '20px', color: '#fff'}}>
        我是子组件三号 欢迎语为： {this.props.title}
      </div>
    )
  }
}
