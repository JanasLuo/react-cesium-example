/*
 * @Descripttion:
 * @version:
 * @Author: liuhaoran
 * @Date: 2021-01-15 11:35:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-25 21:18:40
 */
// const target = "http://nginx-nc"
// const target = "http://192.168.4.102:10000"
// http://119.3.229.77:18080/mockjsdata/87
const target = 'http://123.57.26.81:8080'
// const target = 'http://119.3.229.77:18080/mockjsdata/91'

module.exports = {
  '/3dmap': {
    target: '/',
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/3dmap': '/'
    }
  },
  '/api/mockjsdata/99': {
    target: 'http://119.3.229.77:18080/',
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api': ''
    }
  },
  '/api/mockjsdata': {
    target: 'http://119.3.229.77:18080/',
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api/mockjsdata': '/mockjsdata'
    }
  },
  '/api': {
    target: target,
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api': '/api'
    }
  }
}
