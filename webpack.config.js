const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HappyPack = require('happypack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SentryPlugin = require('webpack-sentry-plugin')

const pjson = require('./package.json')

const config = (env = {}, argv) => {
  const isProductionMode = argv.mode === 'production'
  const country = (env.country || 'sg').toUpperCase()

  return {
    entry: {
      'app': [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js'
      ]
    },
    output: {
      filename: isProductionMode ? 'bundle.[chunkhash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist/webchat')
    },
    module: {
      rules: [{
        test: /\.js$/,
        loaders: [ 'happypack/loader?id=js' ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: isProductionMode,
              sourceMap: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-inline-svg')({
                  path: path.resolve(__dirname, 'src/')
                }),
                require('postcss-cssnext')()
              ]
            }
          }]
        })
      }, {
        test: /\.(png|jpg|gif|svg|woff2?)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }]
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        // components: path.resolve(__dirname, 'src/components'),
      },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProductionMode ? 'production' : 'development',
        SERVER_ENV: env.server || 'test',
        COUNTRY: country,
        LANGUAGE: {
          // resources
        }
      }),
      new ExtractTextPlugin({
        filename: isProductionMode ? 'style.[chunkhash].css' : 'styles.css',
        disable: env.development
      }),
      !isProductionMode && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.NamedModulesPlugin(),
      isProductionMode && new UglifyJSPlugin({
        parallel: true,
        sourceMap: true
      }),
      new HappyPack({
        id: 'js',
        threads: 16,
        loaders: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { 'modules': false }],
              'react',
              'stage-0'
            ],
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        }]
      }),
      isProductionMode && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      isProductionMode && new SentryPlugin({
        organization: 'garena-online-pte-ltd',
        project: 'seller-chat',
        apiKey: '43f603d1c1e54dcd97b511ede6ac1cbdda41e5490ae0435b8f1cc99498a8b730',
        release: pjson.version
      })
    ].filter(plugin => plugin),
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist/webchat'),
      compress: true,
      hot: true,
      proxy: {
        '/api/*': {
          target: 'http://dust.0531yun.cn'
          // secure: false
        }
      },
      port: 4321
    },
    devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map'
  }
}

module.exports = config
