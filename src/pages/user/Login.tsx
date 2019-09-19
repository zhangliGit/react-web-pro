import React from 'react'

export default class Login extends React.Component {
  goHome () {
    this.props.history.push('/home');
  }
  render() {
    return (
      <div className="" onClick={this.goHome.bind(this)}>
        登录
      </div>
    )
  }
}