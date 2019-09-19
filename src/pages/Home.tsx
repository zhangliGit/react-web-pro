import React, { Component } from 'react';
import { actions } from './store/index';

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      detail: ''
    }
  }
  async componentDidMount () {
    let res = await actions.getDetail()
    this.setState({
      detail: res.data.content
    });
  }
  render () {
    return <div className="page-layout">{this.state.detail}</div>;
  }
}
