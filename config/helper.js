/*
 * @Descripttion: 
 * @version: 
 * @Author: luolei
 * @Date: 2021-04-23 15:17:15
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-23 22:43:45
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
/**
 * 给webpack配置增加cesium配置
 * @param {webpack.Configuration } webpackConfig 
 * @param {boolean} beProduction 
 */
function formate_webpack_config_with_cesium(webpackConfig, beProduction) {
    let cesiumPath = beProduction ? path.resolve(__dirname, "../node_modules/cesium/Build/Cesium") : path.resolve(__dirname, "../node_modules/cesium/Build/CesiumUnminified");
    return {
        ...webpackConfig,
        output: {
            ...webpackConfig.output,
            sourcePrefix: ''
        },
        amd: {
            ...webpackConfig.amd,
            toUrlUndefined: true// Enable webpack-friendly use of require in Cesium
        },
        module: {
            ...webpackConfig.module,
            unknownContextCritical: false
        },
        plugins: [
            ...webpackConfig.plugins,
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                'CESIUM_BASE_URL': JSON.stringify('')
            }),
            new CopyWebpackPlugin([
                { from: cesiumPath, ignore: ['Cesium.js'] }
            ]),
        ]
    }
}


module.exports = {
    formate_webpack_config_with_cesium,
}