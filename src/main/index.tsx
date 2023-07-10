import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makelogin } from '@/main/factories/pages/login-factory'

ReactDOM.render(
  <Router
  makeLogin={makelogin} 
  />,
  document.getElementById('main')
)