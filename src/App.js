import React, { Fragment } from 'react'
import { Route, Switch, Link, Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './assets/common.scss'
import routes from './routes'
import BasicLayout from './layout'

const App = (props) => {
    return (
      // <Fragment>
      //    <BasicLayout />
      // </Fragment>
      
      <Switch>
        {
          routes.map(({ name, path, exact = true, component }) => (
            <Route exact={exact} path={path} key={name} component={component} />
          ))
        }
      </Switch>
    )
}

export default App