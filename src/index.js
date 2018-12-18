import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'

const rootElement = document.querySelector('#app')

ReactDOM.render(<BrowserRouter>
    <App />
  </BrowserRouter>, rootElement)