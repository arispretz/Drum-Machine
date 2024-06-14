import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <HelmetProvider>
		  <App />
    </HelmetProvider>
	</React.StrictMode>
)
