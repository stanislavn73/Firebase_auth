import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';

import state from './components/redux/state'

ReactDOM.render(
  <React.StrictMode>
      <App state={state}/>
  </React.StrictMode>,
  document.getElementById('root')
);

