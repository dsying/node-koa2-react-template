import React, { Fragment } from 'react'
import { Route, Switch, Link, Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './assets/common.scss'

import Auth from './views/admin/login'
import Layout from './layout'

const App = (props) => {
    return (
      <Switch>
        <Route  path="/auth"   component={Auth} />
        <Route  path="/admin"   component={Layout} />
      </Switch>
    )
}

export default App