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
  // 选择单选表格
  chooseKey (record) {
    if (this.props.type === 'radio') {
      this.setState({
        chooseValue: [record.id],
      });
      this.props.clickRow(record.id)
    }
  }
  render() {
    let rowSelection = null
    if (this.props.type) {
      rowSelection = {
        onChange: (selectedRowKeys: any) => {
          this.setState({
            chooseValue: selectedRowKeys,
          });
          if (this.props.type === 'radio') {
            this.props.clickRow(selectedRowKeys[0]);
          }
        },
        selectedRowKeys: this.state.chooseValue,
        type: this.props.type,
        disable: true
      };
    }
    return (
      <div className="qui-fx-f1" id="tableList">
        <Table
          onRow={record => {
            return {
              onClick: event => {
                this.chooseKey(record);
              }, // 点击行
            };
          }}
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