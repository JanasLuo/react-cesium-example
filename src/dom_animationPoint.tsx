/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-04-21 11:22:10
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-23 22:31:48
 */
import React from 'react';
import { CesiumMap } from './lib/map';
// import { DomAnimationPoint } from '../../../lib/components/domAnimationPoint';

export default class Dom_animationPoint extends React.Component {
  public pointArr: Cesium.Cartesian3[] = [];
  handleViewerLoaded(viewer: Cesium.Viewer) {
    this.setState({ viewer: viewer });
    let pointArr = Cesium.Cartesian3.fromDegreesArray([
      121,
      31,
      121.2,
      31.1,
      121.5,
      31.2,
    ]);
    viewer.scene.camera.flyToBoundingSphere(
      Cesium.BoundingSphere.fromPoints(pointArr)
    );
    this.pointArr = pointArr;
  }

  state = {
    viewer: null,
  };

  render() {
    return (
      <>
        <CesiumMap
          id={this.constructor.name}
          onViewerLoaded={this.handleViewerLoaded.bind(this)}
        />
        {/* {this.state.viewer
          ? this.pointArr.map((item, index) => {
              return (
                <DomAnimationPoint
                  key={index}
                  viewer={this.state.viewer}
                  trackPos={item}
                />
              );
            })
          : null} */}
      </>
    );
  }
}
