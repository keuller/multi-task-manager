import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'jotai';
import App from './App';

const el = document.getElementById('app');
render(<Provider><App /></Provider>, el);
