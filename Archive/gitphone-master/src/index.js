import React from 'react';
import ReactDOM from 'react-dom';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// https://github.com/oblador/react-native-vector-icons#web-with-webpack
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
