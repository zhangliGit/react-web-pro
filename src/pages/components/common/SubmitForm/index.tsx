import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Form, Radio, Input, Select, DatePicker, Checkbox, Row, Col } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
class SubmitForm extends Component {
  state = {
    confirmLoading: false,
  };
  handleCancel = () => {
    this.props.actionForm(0)
  };
  componentWillUnmount () {
    this.setState({
      confirmLoading: false
    });
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: object) => {
      if (!err) {
        for (let key in values) {
          if (Object.prototype.toString.call(values[key]) === '[object Object]') {
            values[key] = values[key].format('YYYY-MM-DD');
          }
          if (typeof values[key] === 'undefined') {
            values[key] = '';
          }
          if (Array.isArray(values[key]) && values[key][0] instanceof Object) {
            values[key] = [
              values[key][0].format('YYYY-MM-DD'),
              values[key][1].format('YYYY-MM-DD'),
            ];
          }
        }
        this.setState({
          confirmLoading: true
        });
        this.props.actionForm(1, values, () => {
          this.setState({
            confirmLoading: false
          });
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        width="650px"
        title="新增表单"
        destroyOnClose={true}
        visible={this.props.isShow}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <Form {...formItemLayout} className="login-form">
          {this.props.formData.map((item, index) => {
            if (item.type === 'input') {
              return (
                <Form.Item label={item.label} key={Math.random() * 10000}>
                  {getFieldDecorator(item.value, {
                    initialValue: item.initValue,
                    rules: [
                      {
                        required: item.required || true,
                        message: item.placeholder,
                      },
                    ],
                  })(<Input placeholder={item.placeholder} />)}
                </Form.Item>
              );
            } else if (item.type === 'select') {
              return (
                <Form.Item label={item.label} key={Math.random() * 10000}>
                  {getFieldDecorator(item.value, {
                    initialValue: item.initValue || null,
                    rules: [{ required: item.required || true, message: item.placeholder }],
                  })(
                    <Select placeholder={item.placeholder}>
                      {item.list.map((opt, index) => {
                        return (
                          <Option key={Math.random() * 10000} value={opt.key}>
                            {opt.val}
                          </Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              );
            } else if (item.type === 'singleTime') {
              return (
                <Form.Item label={item.label} key={Math.random() * 10000}>
                  {getFieldDecorator(item.value, {
                    initialValue: moment(item.initValue || new Date(), 'YYYY-MM-DD'),
                    rules: [
                      {
                        type: 'object',
                        required: item.required || true,
                        message: item.placeholder,
                      },
                    ],
                  })(<DatePicker format="YYYY-MM-DD" />)}
                </Form.Item>
              );
            } else if (item.type === 'rangeTime') {
              return (
                <Form.Item label={item.label} key={Math.random() * 10000}>
                  {getFieldDecorator(item.value, {
                    initialValue: [
                      moment(item.initValue[0] || new Date(), 'YYYY-MM-DD'),
                      moment(item.initValue[1] || new Date(), 'YYYY-MM-DD'),
                    ],
                    rules: [
                      { type: 'array', required: item.required || true, message: item.placeholder },
                    ],
                  })(<RangePicker format="YYYY-MM-DD" />)}
                </Form.Item>
              );
            } else if (item.type === 'radio') {
              return (
                <Form.Item label={item.label}>
                  {getFieldDecorator(item.value, {
                    initialValue: item.initValue,
                    rules: [{ required: item.required || true, message: item.placeholder }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      {item.list.map((rad:any) => {
                        return (
                          <Radio.Button value={rad.key} key={rad.key}>
                            {rad.val}
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>,
                  )}
                </Form.Item>
              );
            } else if (item.type === 'checkbox') {
              return (
                <Form.Item label={item.label}>
                  {getFieldDecorator(item.value, {
                    initialValue: item.initValue,
                    rules: [{ required: item.required || true, message: item.placeholder }],
                  })(
                    <Checkbox.Group style={{ width: '100%', marginTop: '9px' }}>
                      <Row>
                        {item.list.map((check:any) => {
                          return (
                            <Col
                              key = {check.key}
                              span={
                                24 % item.list.length == 0
                                  ? 24 / item.list.length
                                  : parseInt(24 / item.list.length)
                              }
                            >
                              <Checkbox>
                                {check.val}
                              </Checkbox>
                            </Col>
                          );
                        })}
                      </Row>
                    </Checkbox.Group>,
                  )}
                </Form.Item>
              );
            } else if (item.type === 'upload') {
              return this.props.children
            }
          })}
        </Form>
      </Modal>
    );
  }
} 
const WrappedSumbitForm = Form.create({ name: 'submit_form' })(SubmitForm);

export default WrappedSumbitForm