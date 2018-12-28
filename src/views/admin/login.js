import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import request from '../../lib/request'

class AdminLogin extends Component{
    _toggleLoading(status=false){
        this.setState({
            loading: status
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            request({
                method: 'POST',
                url: '/admin/login',
                data: {
                    ...values
                }
            }).then(res => {
                this.props.history.replace('/admin')
            })
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h3>软件下载后台管理系统</h3>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住用户</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <a href="">注册!</a>
                    </Form.Item>
                </Form>
            </div>
          
        )
      }
}

const WrappedAdminLogin = Form.create()(AdminLogin);

export default WrappedAdminLogin