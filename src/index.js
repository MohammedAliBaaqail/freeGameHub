import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { Analytics } from '@vercel/analytics/react';

import { BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './app/store'
// import commentsStore from './app/commentsStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store} >
    <App />
    <Analytics />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

 