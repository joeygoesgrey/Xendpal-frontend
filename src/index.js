import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContextProvider } from './context/ApplicationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApplicationContextProvider>
        <App />
      </ApplicationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
