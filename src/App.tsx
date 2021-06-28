/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-04-23 11:06:16
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-24 17:05:36
 */
import React from 'react';
import './App.css';
import { CesiumMap } from './lib/map';
import Map from './lib/testmap';
import AnimationPoint from './dom_animationPoint';
import { Route, Router, Switch, Redirect } from 'react-router';
import { createBrowserHistory, createHashHistory } from 'history';
const browserHistory = createBrowserHistory();
const hashHistory = createHashHistory();
function App() {
  return (
    <div className="App" style={{ height: '100%', width: '100%' }}>
      {/* <CesiumMap></CesiumMap> */}
      {/* <Map></Map> */}
      {/* <AnimationPoint></AnimationPoint> */}
      <AppRouter></AppRouter>
    </div>
  );
}

class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Switch>
          <Route path="/3dmap" component={AnimationPoint} />
        </Switch>
      </Router>
    );
  }
}

export default App;
