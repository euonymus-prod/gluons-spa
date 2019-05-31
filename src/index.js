import 'es5-shim';
import 'es6-shim';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
// main routes
import ProviderComposer from './providers/provider-composer'
import Initializer from './initializer'
import './assets/styles/index.css';

ReactDOM.render(
  <ProviderComposer>
    <Initializer />
  </ProviderComposer>,
  document.getElementById('root')
)

