import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';
import 'i18n';

const app = React.createElement(App);
render(app, document.getElementById('root'));
