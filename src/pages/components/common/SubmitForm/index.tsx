import React, { Component } from 'react'

export default class SubmitForm extends Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  render () {
    return (
      <div className={styles.submit}>
        我是子组件2323
      </div>
    );
  }
} 