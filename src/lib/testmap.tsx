/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-04-23 11:41:38
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-23 14:47:21
 */
import React, { useEffect } from 'react';
window.Cesium =
  process.env.NODE_ENV == 'development'
    ? require('cesium/Build/CesiumUnminified/Cesium')
    : require('cesium/Build/Cesium/Cesium');
(window as any).CESIUM_BASE_URL = window.location.href;
const Map = () => {
  useEffect(() => {
    debugger;
    console.log(window.Cesium);
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODRlYzNmMS0yNDIwLTQ2NmMtYTc3Zi0wMzM4NmQ0YjYzMTIiLCJpZCI6MzA5NjgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ2NDk0OTJ9.Zv-IGFXrfy8a1gJmwGBqgXEZAuNKJ-UGcjjDy-Mbass';
    var viewer = new Cesium.Viewer('map');
    viewer.camera.setView({
      // destination: Cesium.Cartesian3.fromDegrees(
      //   -74.0059731,
      //   40.7143528,
      //   1500.0
      // ),
      destination: Cesium.Cartesian3.fromDegrees(
        114.30385832,
        30.64797001,
        15000.0
      ),
      orientation: {
        heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
        pitch: Cesium.Math.toRadians(-90), // default value (looking down)
        roll: 0.0, // default value
      },
    });
  }, []);

  return <div style={{ height: '100%', width: '100%' }} id="map"></div>;
};

export default Map;
