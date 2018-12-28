import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'


const rootElement = document.querySelector('#app')

ReactDOM.render(
  <Router>
    <App />
  </Router>, rootElement)