import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';


const rootElement = document.querySelector('#app')

ReactDOM.render(
  <Router>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Router>, rootElement)