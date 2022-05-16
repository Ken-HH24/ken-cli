import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
<%_ if (importCss) { _%>
import './index.css';
<%_ } _%>


ReactDOM.render(<App />, document.getElementById('root'));
