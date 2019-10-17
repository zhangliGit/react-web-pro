import React, { Component } from 'react'
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Input, Button } from 'antd'
import ChildOne from './ChildOne'
import ChildTwo from './ChildTwo'
import styles from './home.less'

interface SecurityLayoutProps extends ConnectProps {
  name: String;
}

interface SecurityLayoutState {
  msg: string;
  title: string
}

class Home extends Component<SecurityLayoutProps, SecurityLayoutState> {
  constructor(props: any) {
    super(props);
    console.log(this.props)
    this.state = {
      msg: '我是左边区域',
      title: 'hello world',
    };
  }
  async componentDidMount() {}
  changeTitle(e: any) {
    this.setState({
      title: e.target.value,
    });
  }
  changeMsg = () => {
  };
  async getData () {
    const res = await this.props.dispatch({
      type: 'home/getIndex',
      params: {
        key: 'name',
        data: 'haha'
      },
    })
    console.log('res', res)
  }
  changeChild = () => {
    this.props.dispath({
      type: 'home/setData',
      payload: {
        key: 'name',
        data: '12'
      }
    })
  };
  render() {
    const { title, msg } = this.state;
    return (
      <div className="qui-fx">
        <div
          className={`qui-fx-f1 ${styles['bg-1']}`}
          style={{ padding: '20px', color: '#fff', lineHeight: '24px' }}
        >
          <div>{msg}</div>
          <div>{this.props.name}</div>
          <div onClick={() => this.getData()}>ajax请求</div>
          <Button type="primary" onClick={() => this.changeChild()}>
            改变子组件标题
          </Button>
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

export default connect(({ home }: ConnectState) => ({
  name: home.name
}))(Home);

