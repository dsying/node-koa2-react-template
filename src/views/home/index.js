import React, { Component, Fragment } from 'react';
import { Table, Divider, Button, Modal, Form, Input, message } from 'antd';
import request from '../../lib/request'


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true
            },
            loading: false,
            visible: false,
            operation: '', // update|create
            initialValue: {}
        }
        this.columns = [{
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '分类路径',
            dataIndex: 'path',
            key: 'path',
          }, {
            title: '更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
          }, {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
              <span>
                <a href="javascript:;" onClick={this.handleEdit.bind(this,text)}>编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={this.handleEdit}>删除</a>
              </span>
            ),
          }]
    }


    render(){
        return (
            <div>
                <Button type="primary">新建</Button>
                <Table 
                    columns={this.columns} 
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    bordered
                />
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onUpdate={ this.handleUpdate}
                    initialValue={this.state.initialValue}
                />
            </div>

        )
    }

    // 声明周期 已挂载 获取初始数据
    componentDidMount() {
        this.fetch()
    }

    // 获取分类列表
    fetch = (params = {}) => {
        this.setState({loading:true})
        request({
            method: 'GET',
            url: '/softwareType/all',
            params: {
                pageSize: 10,
                page: 1,
                ...params
            }
        }).then(res => {
            const pagination = Object.assign({},this.state.pagination)
            pagination.total = res.count
            const data = []
            for(let item of res.rows){
                const { id: key, name, path, update_time } = item
                data.push({key, name, path, update_time})
            }
            this.setState({
                loading: false,
                data,
                pagination
            })
        })
    }

    // 分页信息更改后触发 获取新的分类列表
    handleTableChange = (pagination, filters, sorter) => {
        const pager = JSON.parse(JSON.stringify(this.state.pagination))
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            pageSize: pagination.pageSize,
            page: pagination.current
        });
    }

    saveFormRef = (formRef) => {
        console.log('saveFormRef', formRef);
        this.formRef = formRef;
    }

    // 编辑 ==> 弹出对话框
    handleEdit = (text) => {
        console.log('编辑按钮触发，text:',text);
        this.setState({ 
            visible: true,
            operation: 'update',
            initialValue: {
                id: text.key,
                name: text.name,
                path: text.path
            } 
        });
    }
    // 取消按钮
    handleCancel = () => {
        const form = this.formRef.props.form;
        form.resetFields();//重置输入控件的值为initialValue
        this.setState({ visible: false, operation: '', initialValue: {}});
    }

    // 确认按钮
    handleUpdate = () => {
        console.log('点击确定触发',this);
        const form = this.formRef.props.form;
        const { operation, initialValue } = this.state
        const { id, name, path } = initialValue
        // 表单校验
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            
            
            if(operation === 'update'){
                console.log('执行更新操作')
                request({
                    method: 'PUT',
                    url: `/softwareType/${id}`,
                    data: {
                        name,
                        path
                    }
                }).then(res => {
                    message.success('更新成功!')
                }).catch(err => {
                    message.error(err)
                })
            }else if(operation === 'create'){
                console.log('执行新增操作')
            }

            form.resetFields();//重置输入控件的值为initialValue
            this.setState({ visible: false, operation: '', initialValue: {} });//隐藏弹出框
        });
    }


    
    
}

const CollectionCreateForm = Form.create()(
    class extends React.Component {
      render() {
        console.log(this.props);
        const {
          visible, onCancel, onUpdate, form, initialValue
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="创建软件分类"
            okText="确定"
            onCancel={onCancel}
            onOk={onUpdate}
          >
            <Form layout="horizontal">
              <Form.Item label="分类名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入分类名称!' }],
                  initialValue: initialValue.name
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="分类路径">
                {getFieldDecorator('path', {
                    rules: [{ required: true, message: '请输入分类路径!' }],
                    initialValue: initialValue.path
                })(<Input />)}
              </Form.Item>
              
            </Form>
          </Modal>
        );
      }
    }
  );
  
export default  Home
