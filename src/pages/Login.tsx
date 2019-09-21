import React from 'react'
import { Button, Input } from 'antd'

const styles = {
  login: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    left: '50%',
    top: '50%',
    margin: '-250px 0 0 -150px'
  },
};

export default class Login extends React.Component {
  goHome() {
    this.props.history.push('/home')
  }
  render() {
    return (
      <div style={{ ...styles.login }}>
        <Input placeholder="请输入账号" style={{ margin: '10px 30px' }}></Input>
        <Input placeholder="请输入密码" style={{ margin: '10px 30px' }}></Input>
        <div style={{ textAlign: 'center'}}>
          <Button type="primary" style={{ width: '100%', margin: '10px 30px'}} onClick={this.goHome.bind(this)}>
            登录
          </Button>
        </div>
      </div>
    );
  }
}

