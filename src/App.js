import React, { Fragment } from 'react'
import { Route, Switch, Link, Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './assets/common.scss'

import BasicLayout from './layout'

const App = (props) => {
    return (
      <Fragment>
         <BasicLayout />
      </Fragment>
      
    )
}

export default App