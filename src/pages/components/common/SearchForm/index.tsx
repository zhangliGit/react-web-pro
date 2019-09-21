import React from 'react'
import { Form, Button, Input, Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker
const { Option } = Select;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:object) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="qui-fx" style={{padding: '15px 10px'}}>
        <div>
          <Button type="primary">新增</Button>
        </div>
        <div className="qui-fx-f1 qui-fx-je">
          <Form onSubmit={this.handleSubmit} className="login-form" layout="inline">
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: false, message: '请输入用户名' }],
              })(<Input placeholder="请输入姓名" />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('gender', {
                initialValue: '',
                rules: [{ required: false, message: '' }],
              })(
                <Select
                  style={{ width: '100px' }}
                  placeholder="Select a option and change input text above"
                >
                  <Option value="">全部</Option>
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="日期">
              {getFieldDecorator('date', {
                rules: [{ type: 'object', required: false, message: '请选择时间' }],
              })(<DatePicker format="YYYY-MM-DD" />)}
            </Form.Item>
            <Form.Item label="起始日期">
              {getFieldDecorator('dateTime', {
                rules: [{ type: 'array', required: false, message: '请选择时间' }],
              })(<RangePicker format="YYYY-MM-DD" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
          <div></div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;