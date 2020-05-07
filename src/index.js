import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'antd/dist/antd.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

// redux setup
import { Provider } from 'react-redux';
import { store, rrfProps } from './app/redux/configureStore';

// react router setup
import { BrowserRouter } from 'react-router-dom';

// react redux firestore setup
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import Toastr from './app/layout/Toastr';
import ScrollToTop from './app/layout/ScrollToTop';

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Toastr />
          <ScrollToTop />
          <App />
        </ReactReduxFirebaseProvider>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
