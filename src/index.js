import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';
import axios from 'axios';

axios.defaults.baseURL = 'https://rick-back-production-dd5d.up.railway.app/rickandmorty';


createRoot(document.getElementById('root'))
  .render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
);
