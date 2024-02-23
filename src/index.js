import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Analytics } from '@vercel/analytics/react';

import { BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './app/store'
// import commentsStore from './app/commentsStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <I18nextProvider i18n={i18n}>
    <Provider store={store} >
    <App />
    <Analytics />
    </Provider>
    </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

 