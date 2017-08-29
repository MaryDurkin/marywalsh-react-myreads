import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/*
* Broswer router was added here, rather than in app.js
* my reasoning was that it clearly wraps the whole app
* Also - this is the way it was done for the contacts app
*/
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)
