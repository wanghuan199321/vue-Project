const SpritesmithPlugin = require('webpack-spritesmith')
const path = require('path')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  devServer: {
    proxy: {
      '^/api': {
        target: 'https://demo-im-web.qaqgame.com',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  productionSourceMap: false,
  css: {
    sourceMap: false

  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        let minify = {
          ...args[0]['minify'],
          minimize: true,
          minifyCSS: true,
          minifyJS: true
        }
        args[0]['minify'] = minify
        return args
      })
  },

  /* devServer: {
    proxy: {
      '/api': {
        // target: 'https://xiebug.com/mock/5badc30d450c625c0c5b4046/lulu'
        target: 'https://t.luliluli.com'
      }
    }
  }, */

  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, './src/icon'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, './src/assets/icon.png'),
          css: [[path.resolve(__dirname, './src/style/icon.less'), {
            format: 'function_based_template'
          }]]
        },
        customTemplates: {
          'function_based_template': path.resolve(__dirname, './icon_handlebars_template.handlebars')
        },
        apiOptions: {
          cssImageRef: '../assets/icon.png',
          handlebarsHelpers: {
            nameHandle: function (name) {
              let iconName = /^icon/img.test(name) ? name : `icon-${name}`
              return /hover$/img.test(iconName) ? iconName.replace(/hover$/img, ':hover') : iconName
            },
            zeroHandle: function (val) {
              val = parseInt(val)
              if (val === 0) {
                return 0
              } else {
                return val + 'px'
              }
            }
          }
        },
        spritesmithOptions: {
          algorithm: 'binary-tree'
        }
      })
    ]
  }
}
