import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Link, Router } from 'react-router-dom'
import routes from '../routes'


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends Component {
  constructor(props){
    super(props)
    
  }
  render() {
    return (
      <Layout>

        <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
          <div style={{ height: '64px', lineHeight: '64px', background: '#002140', textAlign: 'center'}}>
            <h1 style={{ color: '#fff', fontFamily: 'Avenir, Helvetica Neue, Arial, Helvetica, sans-serif', fontSize: '22px'}}>软件下载后台管理系统</h1>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>软件分类</span></span>} >
               <Menu.Item key="1">分析页</Menu.Item>
               <Menu.Item key="2">监控页</Menu.Item>
               <Menu.Item key="3">工作台</Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
               <Link to="/detail">
                <Icon type="pie-chart" />
                <span>权限管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>

          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>

          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {
                  routes.map(({ name, path, exact = true, component }) => (
                    <Route exact={exact} path={path} key={name} component={component} />
                  ))
                }
              </Switch>
            </div>
          </Content>

        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout;