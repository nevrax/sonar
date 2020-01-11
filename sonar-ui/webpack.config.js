const argv = require('webpack-nano/argv')
const p = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')

const isDev = argv.watch || argv.serve || process.env.NODE_ENV === 'development'
let output = 'dist'
let ramdisk = false
if (isDev) {
  // Optional ramdisk arg to build in a ramdisk (faster!)
  ramdisk = !!argv.ramdisk || !!process.env.WP_RAM
  output = ramdisk ? 'build-ramdisk' : 'build'
}
output = p.join(__dirname, output)

const config = {
  entry: ['./src/index.js'],
  mode: isDev ? 'development' : 'production',
  watch: argv.watch || argv.serve,
  devtool: isDev ? 'eval-source-map' : 'none',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
      // {
      //   test: /\.(css|pcss)$/,
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { importLoaders: 1 } },
      //     'postcss-loader'
      //   ]
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  output: {
    path: output,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sonar'
      // template: './index.html'
    })
  ]
}

if (process.env.WEBPACK_ANALYZE) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (argv.serve) {
  config.plugins.push(
    new WebpackPluginServe({
      host: 'localhost',
      static: output,
      open: false,
      liveReload: true,
      historyFallback: true,
      // progress: 'minimal',
      progress: false,
      ramdisk: ramdisk
    })
  )
  config.entry.push(
    'webpack-plugin-serve/client'
  )
}

module.exports = config
