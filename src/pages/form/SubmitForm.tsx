import React, { Component } from 'react'
import { Tag } from 'antd'
import { actions } from '@s/index';
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum';


export default class SubmitFormCom extends Component {
  constructor (props:any) {
    super(props)
    this.state = {
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      dataList: [
        {
          id: 1,
          name: '张立',
          sex: 1,
        },
        {
          id: 2,
          name: '陈甜',
          sex: 2,
        },
      ],
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '10%',
        render: (text: any, record: object, index: number) => {
          return index + 1;
        },
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: '年龄',
        dataIndex: 'sex',
        render: (text: any) => {
          return parseInt(text) === 1 ? '男' : '女';
        },
        width: '20%',
      },
      {
        title: '操作',
        key: 'action',
        width: '40%',
        render: (record: any) => (
          <div>
            <Tag onClick={() => this.delList(record)} color="orange">
              删除
            </Tag>
            <Tag onClick={() => this.modify(record)} color="#ccc">
              编辑
            </Tag>
          </div>
        ),
      },
    ];
  }
  delList(record:object) {
    const newData = this.state.dataList.filter(item => {
      return item.id !== record.id
    })
    this.setState({
      dataList: newData,
    });
  }
  modify(record: object) {
    alert(record.id)
  }
  componentDidMount () {
    this.showList()  
  }
  async showList () {
    const res = await actions.getIndex();
    this.setState({
      dataList: res.data,
      total: 40
    })
  }
  change (obj) {
    this.showList()
  }
  searchLabel = [
    {
      type: 'input',
      value: 'name'
    },
    {
      type: 'select',
      value: 'status'
    },
    {
      type: 'sigleTime',
      value: 'date'
    }
  ]
  render () {
    return (
      <div className="qui-fx-ver">
        <SearchForm searchLabel={this.searchLabel}></SearchForm>
        <div className="qui-fx-f1 qui-fx">
          <TableList columns={this.columns} dataList={this.state.dataList}></TableList>
        </div>
        <PageNum total={this.state.total} change={obj => this.change(obj)}></PageNum>
      </div>
    );
  }
}