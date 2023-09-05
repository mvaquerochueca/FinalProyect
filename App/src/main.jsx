import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { BrowserRouter as Router } from 'react-router-dom'
// import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    // <NextUIProvider>
    <Router>
        {(() => console.debug('Router ->render'))()}
        <App />
    </Router>
    // </NextUIProvider>
    // </React.StrictMode>
)
