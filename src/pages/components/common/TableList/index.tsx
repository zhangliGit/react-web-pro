import React, { Component } from 'react'
import { Table } from 'antd'
import Tools from '@u/utils'

export default class TableList extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      chooseValue: this.props.chooseValue || []
    };
  }
  render() {
    const rowSelection = null
    if (this.props.type) {
      rowSelection = {
        onChange: (selectedRowKeys: any) => {
          this.setState({
            chooseValue: selectedRowKeys,
          });
        },
        selectedRowKeys: this.state.chooseValue,
        type: this.props.type
      };
    }
    return (
      <div className="qui-fx-f1" id="tableList">
        <Table
          rowSelection={rowSelection}
          pagination={false}
          rowKey={record => record.id}
          columns={this.props.columns}
          scroll={{ y: Tools.setScroll('tableList') }}
          dataSource={this.props.dataList}
        ></Table>
      </div>
    );
  }
} 