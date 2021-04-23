/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-04-23 11:06:16
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-23 14:46:31
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CesiumMap } from './lib/map';
import Map from './lib/testmap';

function App() {
  return (
    <div className="App" style={{ height: '100%', width: '100%' }}>
      {/* <CesiumMap></CesiumMap> */}
      <Map></Map>
    </div>
  );
}

export default App;
