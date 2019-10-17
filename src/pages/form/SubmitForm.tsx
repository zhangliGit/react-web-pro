import React, { Component } from 'react'
import { Row, Col, Tag, Button, message } from 'antd';
import { actions } from '@s/index';
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm';
import UploadMulti from '@c/UploadMulti';
import Tools from '@u/utils';


export default class SubmitFormCom extends Component {
  state = {
    total: 0,
    fileList: [],
    pageList: {
      page: 1,
      size: 20
    },
    isShow: false,
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
  columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '10%',
      render: (text: any, record: object, index: number) => {
        return (this.state.pageList.page - 1) * this.state.pageList.size + (index + 1);
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
  delList(record : any) {
    Tools.delTip('', () => {
      const newData = this.state.dataList.filter(item => {
        return item.id !== record.id
      });
      this.setState({
        dataList: newData,
      });
    });
  }
  modify(record : Object) {
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
  change (obj: Object) {
    console.log(obj)
    this.setState({
      pageList: obj,
    });
    this.showList()
  }
  searchLabel = [
    {
      type: 'input',
      value: 'name',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    {
      list: [
        {
          key: '',
          val: '全部'
        }, {
          key: '1',
          val: '男'
        }, {
          key: '2',
          val: '女'
        }
      ],
      type: 'select',
      value: 'sex',
      label: '性别'
    },
    {
      type: 'singleTime',
      value: 'date',
      label: '日期'
    },
    {
      type: 'rangeTime',
      value: 'dateTime',
      label: '起始日期'
    }
  ]
  searchForm (values : Object) {
    console.log(values)
  }
  addForm = () => {
    this.setState({
      isShow: true
    })
  }
  tablePorps = { 
    type: 'checkbox',
    chooseValue: [1,2]
  }
  leftBtn = () => {
    return (
      <div>
        <Button type="primary" onClick={this.addForm}>新增</Button>
        <Button type="primary" onClick={this.tableRow} style={{ marginLeft: '10px' }}>
          获取选择的行
        </Button>
      </div>
    );
  }
  // 获取选择的行
  tableRow = () => {
    console.log(this.refs.table.state.chooseValue);
  }
  rightBtn = () => {
    return (
      <Button type="primary" style={{marginLeft: '10px'}}>
        导出
      </Button>
    );
  }
  formData = [
    {
      type: 'input',
      value: 'name',
      label: '姓名',
      initValue: '',
      placeholder: '请输入姓名',
    },
    {
      list: [
        {
          key: '1',
          val: '男',
        },
        {
          key: '2',
          val: '女',
        },
      ],
      initValue: [],
      placeholder: '请选择性别',
      type: 'select',
      value: 'sex',
      label: '性别',
    },
    {
      list: [
        {
          key: 1,
          val: '是',
        },
        {
          key: 2,
          val: '否',
        },
      ],
      initValue: 2,
      type: 'radio',
      value: 'isMarry',
      label: '是否已婚',
    },
    {
      list: [
        {
          key: 1,
          val: '篮球',
        },
        {
          key: 2,
          val: '羽毛球',
        },
      ],
      initValue: [],
      type: 'checkbox',
      value: 'enjoy',
      label: '兴趣爱好',
      placeholder: '请选择兴趣爱好',
    },
    {
      type: 'upload',
    },
    {
      type: 'singleTime',
      value: 'date',
      label: '日期',
      initValue: '',
      placeholder: '请选择日期',
    },
    {
      type: 'rangeTime',
      value: 'dateTime',
      label: '起始日期',
      initValue: ['2019-10-10', '2019-1014'],
      placeholder: '请选择起始日期',
    },
  ];
  actionForm = (type: number, values = {}, cb: any) => {
    if (type) {
      if (this.state.fileList.length === 0) {
        message.warning('请上传图片');
        return;
      }
      setTimeout(() => {
        this.setState({
          isShow: false,
        });
        cb();
      }, 3000)
    } else {
      this.setState({
        isShow: false
      })
    }
  }
  getFile = (fileList:Array<Object>) => {
    this.setState({
      fileList
    })
  }
  fileInfo = {
    url: '/upload/base/file/freeUpload', // 接口地址
    tip: '上传照片',
    w: 102,
    h: 102
  }
  render () {
    return (
      <div className="qui-fx-ver">
        <SubmitForm
          ref="submit"
          actionForm={this.actionForm}
          formData={this.formData}
          isShow={this.state.isShow}
        >
          <Row className="qui-fx" style={{marginBottom: '10px'}}>
            <Col span={4} style={{color: "#333", textAlign: 'right', paddingRight: '8px'}}>
            <span style={{color: 'red'}}>*</span>
            上传图片:
            </Col>
            <Col span={20}>
              <UploadMulti
              fileList={this.state.fileList}
              getFile={this.getFile}
              fileInfo={this.fileInfo}
              length={3}
            ></UploadMulti>
            </Col>
          </Row>
        </SubmitForm>
        <SearchForm
          right={this.rightBtn()}
          left={this.leftBtn()}
          searchLabel={this.searchLabel}
          searchForm={this.searchForm}
        ></SearchForm>
        <div className="qui-fx-f1 qui-fx">
          <TableList
            ref="table"
            fileInfo={this.fileInfo}
            columns={this.columns}
            dataList={this.state.dataList}
          ></TableList>
        </div>
        <PageNum total={this.state.total} change={(obj: any) => this.change(obj)}></PageNum>
      </div>
    );
  }
}