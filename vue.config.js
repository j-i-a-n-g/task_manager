const path = require('path')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = {
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/node': {
        target: 'http://localhost:121',
        changeOrigin: true, // 开启代理服务器
        pathRewrite: {
          '/node': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      // config.set('externals', {
      //   vue: 'vue',
      //   'vue-router': 'VueRouter',
      //   aixos: 'axios',
      //   echarts: 'echarts'
      // })
    } else {
      // 开发环境
    }
    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/image'),
          '@c': path.resolve(__dirname, './src/components')
        }
      },
      plugins: [
        ComponentsPlugin({
          resolvers: [VantResolver()]
        })
      ]
    }
  }

}
