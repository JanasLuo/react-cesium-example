import React from 'react';
import 'cesium/Build/Cesium/Widgets/widgets.css';
window.Cesium =
  process.env.NODE_ENV == 'development'
    ? require('cesium/Build/CesiumUnminified/Cesium')
    : require('cesium/Build/Cesium/Cesium');
/**
 *      可以在webpack中配置
*     new webpack.DefinePlugin({
          // Define relative base path in cesium for loading assets
          'CESIUM_BASE_URL': JSON.stringify('')
      }),
 */
(window as any).CESIUM_BASE_URL = window.location.href;

export class CesiumMap extends React.Component<{
  id?: string;
  setUp?: boolean;
  onViewerLoaded?: (viewer: Cesium.Viewer) => void;
}> {
  private _viewer: any;
  get viewer() {
    return this._viewer;
  }
  state = {
    beActive: false,
  };
  private get containerId() {
    return this.props.id || '__cesiumContainer';
  }
  componentDidMount() {
    if (this.props.setUp != false) {
      this.setUp();
      // console.log('Cesium', Cesium);
      // debugger;
      // Cesium.Ion.defaultAccessToken =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODRlYzNmMS0yNDIwLTQ2NmMtYTc3Zi0wMzM4NmQ0YjYzMTIiLCJpZCI6MzA5NjgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ2NDk0OTJ9.Zv-IGFXrfy8a1gJmwGBqgXEZAuNKJ-UGcjjDy-Mbass';
      // var viewer = new Cesium.Viewer('__cesiumContainer');
    }
  }

  setUp(options?: {
    imageryProvider?: any;
    imageryProviderViewModels?: Cesium.ProviderViewModel[];
    orderIndependentTranslucency?: boolean;
    contextOptions?: {
      webgl?: {
        alpha?: boolean;
      };
    };
    ION?: string;
  }): Cesium.Viewer {
    console.warn('cesium 启动！！');
    this.setState({ beActive: true });
    Cesium.Ion.defaultAccessToken = options?.ION || MapConfig.ION;
    let viewer: Cesium.Viewer = new Cesium.Viewer(this.containerId, {
      ...MapConfig.MAPOPTIONS,
      ...options,
    });
    // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
    // var url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.UrlTemplateImageryProvider({ url })
    // );
    (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'; //去除版权信息
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    ); //移除双击选中

    // var terrainProvider = Cesium.createWorldTerrain({
    //     requestVertexNormals: true
    // });
    // viewer.terrainProvider = terrainProvider;

    viewer.scene.globe.enableLighting = MapConfig.global.enableLighting; //光照开关
    viewer.scene.globe.depthTestAgainstTerrain =
      MapConfig.global.depthTestAgainstTerrain; //depth
    viewer.scene.highDynamicRange = true;

    //-----------------
    viewer.canvas.oncontextmenu = function (e) {
      //左键--button属性=1，右键button属性=2
      if (e.button == 2) {
        e.preventDefault();
      }
    };
    //------------
    viewer.frameUpdate = new Cesium.Event();
    let lasTime: any;
    viewer.scene.preUpdate.addEventListener((time) => {
      let dateNow = Date.now();
      let deltaTime = lasTime != null ? dateNow - lasTime : 0;
      lasTime = dateNow;
      viewer.frameUpdate.raiseEvent(deltaTime);
    });

    if (this.props.onViewerLoaded != null) {
      this.props.onViewerLoaded(viewer);
    }
    this._viewer = viewer;
    return viewer;
  }
  beforeDestroy = new Cesium.Event();
  destroy() {
    this.beforeDestroy.raiseEvent();
    console.warn('cesium destroy！！');
    this._viewer?.destroy();
    this._viewer = null;
  }

  componentWillUnmount() {
    this.destroy();
  }

  render() {
    const containerStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      // position: "absolute",
      display: this.state.beActive ? 'inline' : 'none',
    };
    return (
      <div id={this.containerId} style={containerStyle}>
        {this.props.children}
      </div>
    );
  }
}

const MapConfig = {
  ION:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzJmNDgwZi1iNmQ2LTQ0NWEtOWRkNi0wODkxYzYxYTg0ZDIiLCJpZCI6ODUzMiwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjIwMjY4OH0.u4d7x0IxZY06ThT4JFmxrfgBxVjQcfI6xXDLu-fsWsY',
  global: {
    enableLighting: false,
    depthTestAgainstTerrain: true,
  },
  MAPOPTIONS: {
    imageryProviderViewModels: [
      new Cesium.ProviderViewModel({
        name: 'Google卫星',
        iconUrl: '',
        tooltip: 'Google卫星',
        creationFunction: function () {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}', //影像图 (中国范围无偏移)
            // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png}', //影像图 (中国范围无偏移)
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            minimumLevel: 1,
            maximumLevel: 200,
            credit: 'Google Earth',
          });
        },
      }),
    ], //设置影像图列表
    shouldAnimate: true,
    geocoder: false, //右上角查询按钮
    shadows: false,
    terrainProviderViewModels: [], //设置地形图列表
    animation: false, //动画小窗口
    baseLayerPicker: false, //图层选择器
    fullscreenButton: false, //全屏
    vrButton: false, //vr按钮
    homeButton: false, //home按钮
    infoBox: false,
    sceneModePicker: false, //2D,2.5D,3D切换
    selectionIndicator: false,
    timeline: false, //时间轴
    navigationHelpButton: false, //帮助按钮
    terrainShadows: Cesium.ShadowMode.DISABLED,
  },
};
