import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CoinContextProvider from './Context/CoinContext';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<CoinContextProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
</CoinContextProvider>
</React.StrictMode>,
)