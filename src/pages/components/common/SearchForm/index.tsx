import React from 'react'
import { Form, Button, Input, Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker
const { Option } = Select;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:object) => {
      if (!err) {
        for (let key in values) {
          if (Object.prototype.toString.call(values[key]) === "[object Object]") {
            values[key] = values[key].format('YYYY-MM-DD')
          }
          if (typeof values[key] === 'undefined') {
            values[key] = ''
          }
          if (Array.isArray(values[key])) {
            values[key] = [values[key][0].format('YYYY-MM-DD'), values[key][1].format('YYYY-MM-DD')]
          }
        }
        this.props.searchForm(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="qui-fx" style={{padding: '15px 10px'}}>
        <div>
         { this.props.left }
        </div>
        <div className="qui-fx-f1 qui-fx-je">
          <Form onSubmit={this.handleSubmit} className="login-form" layout="inline">
            {
              this.props.searchLabel.map((item, index) => {
                if (item.type === 'input') {
                  return (
                    <Form.Item label={item.label} key={index}>
                      {getFieldDecorator(item.value)(<Input placeholder={item.placeholder} />)}
                    </Form.Item>
                  );
                } else if (item.type === 'select') {
                  return (
                    <Form.Item label={item.label} key={index}>
                      {getFieldDecorator(item.value, {
                        initialValue: '',
                        rules: [{ required: false, message: '' }],
                      })(
                        <Select style={{ width: '100px' }} placeholder="全部">
                          {item.list.map(opt => {
                            return (
                              <Option key={opt.key} value={opt.key}>
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
                    <Form.Item label={item.label} key={index}>
                      {getFieldDecorator(item.value, {
                        rules: [{ type: 'object', required: false, message: '请选择时间' }],
                      })(<DatePicker format="YYYY-MM-DD" />)}
                    </Form.Item>
                  );
                } else if (item.type === 'rangeTime') {
                  return (
                    <Form.Item label={item.label} key={index}>
                      {getFieldDecorator(item.value, {
                        rules: [{ type: 'array', required: false, message: '请选择时间' }],
                      })(<RangePicker format="YYYY-MM-DD" />)}
                    </Form.Item>
                  );
                }
              })
            }
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              {this.props.right}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;