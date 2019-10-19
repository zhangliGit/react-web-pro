import React, { Component } from 'react';
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';
import ChildThree from './ChildThree';
import { Button } from 'antd';
import PropTyps from 'prop-types'

interface SecurityLayoutProps extends ConnectProps {
  name: String;
}

interface SecurityLayoutState {
  title: string
}

class ChildOne extends Component<SecurityLayoutProps, SecurityLayoutState> {
  static contextTypes = {
    router: PropTyps.object.isRequired,
    store: PropTyps.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    console.log('one', props, context);
    this.state = {
      title: '我是子组件一号',
    };
  }
  setTitle() {
    this.setState({
      title: '我是新的标题',
    });
  }
  render() {
    console.log('compoonent props', this.props);
    return (
      <div
        style={{
          background: '#fff',
          padding: '30px',
          margin: '20px',
          color: '#333',
        }}
      >
        {this.state.title} 欢迎语：{this.props.title}
        <Button type="primary" onClick={() => this.props.change()}>
          修改标题
        </Button>
        <div>{this.props.name}</div>
        <ChildThree title={this.props.title}></ChildThree>
      </div>
    );
  }
}

export default connect(({ home }: ConnectState) => ({
  name: home.name,
}))(ChildOne);