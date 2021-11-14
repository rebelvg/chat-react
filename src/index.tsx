import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './Components/AppContainer';

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

ReactDOM.render(<AppContainer />, document.getElementById('app'));
