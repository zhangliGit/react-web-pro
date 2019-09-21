import React, { Component } from 'react'
import { Table } from 'antd'
import Tools from '@u/utils'

export default class TableList extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRowKeys: [1]
    };
  }
  change(values: any) {
    console.log(values)
  }
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys: any) => {
        this.setState({
          selectedRowKeys
        });
      },
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'checkbox',
    };
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