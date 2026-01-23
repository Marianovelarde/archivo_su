import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import AppWrapper from './AppWrapper'
import SessionManager from './components/session/SessionManager'
ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
  <BrowserRouter>
    <AppWrapper>
      <SessionManager />
      <App />
    </AppWrapper>
  </BrowserRouter>
</Provider>

)

