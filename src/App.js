import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import './assets/common.scss'
import routes from './routes'

const App = (props) => {
    return (
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