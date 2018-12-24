import React, { Component } from 'react';
// , NavLink
// import { HashRouter as Router, Switch, NavLink } from 'react-router-dom';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
// import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
// import { Button } from 'antd';
// import CSSModules from 'react-css-modules';  太大了不用
// import createHistory from 'history/createBrowserHistory';
// import { FrontendAuth } from './components/frontend-auth.component';
import { message, Modal, notification } from 'antd';
// import { routes } from './routes';
import store from './store';
import router from './routes';

React.Component.prototype.$msg = message;
React.Component.prototype.$modal = Modal;
React.Component.prototype.$notification = notification;
// @CSSModules(styles)
const persistor = getPersistor();
// const history = createHistory();
// // const location = history.location;
// history.listen(() => {
//   // console.log(location, action);
//   store.dispatch.demo.setCountLoading([]);
//   // location是location对象
//   // action是动作名称，比如 "PUSH"
// });
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <router.view />
        </PersistGate>
      </Provider>
    );
  }
}

// export default CSSModules(App, styles);
export default App;

/* <Router>
            <div>
              <NavLink to="/home">home</NavLink>
              <NavLink to="/demo">demo</NavLink>
              <NavLink to="/game">game</NavLink>
              <Switch>{renderRoutes(routes)}</Switch>
            </div>
          </Router> */
