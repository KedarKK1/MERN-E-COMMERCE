import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store';
// for alert using reat-alert
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter as Router } from 'react-router-dom';
// since page needed refresh onClick they were not updating only url was changine but page not changing hence used HashRouter
// import { BrowserRouter as Router, hashHistory, HashRouter } from 'react-router-dom';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router >
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options} >
          <App />
        </AlertProvider>
      </Provider>
    </Router >
  </React.StrictMode>
);
