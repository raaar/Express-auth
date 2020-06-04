import React from 'react';
import ReactDOM from "react-dom";
// import Routes from "./containers/Routes";

import App from './containers/App';
// import "../scss/styles.scss";

const element = document.getElementById('App');
const render = (Component) => ReactDOM.render(<Component />, element);

if (element) {
  render(App);
}
