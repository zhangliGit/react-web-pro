import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class PageNum extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="qui-fx-ac qui-fx-je" style={{ padding: '20px' }}>
        <span style={{ marginRight: '10px' }}>一共{this.props.total}条</span>
        <Pagination
          total={this.props.total}
          defaultPageSize={20}
          onShowSizeChange={(page, size) => this.props.change({ page, size })}
          onChange={(page, size) => this.props.change({ page, size })}
          showSizeChanger
          showQuickJumper
        />
      </div>
    );
  }
} 