const path = require("path");
const webpack = require("webpack");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

/*
 * Dev Server Config
 */
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },

    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,

      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    }
  },

  plugins: [
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ])
  ]
});

/*
 * Enable Source map :::: NOTE: Map original source code with build one (mainly used for debug purpose)
 */
exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

/*
 * CSS & Style loader :::: NOTE: This includes CSS directly in bundled js (for separate file see below extract css).
 */
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});

/*
 * Extract CSS into separate file :::: NOTE: Don't work on live reload, so only for production usage
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: "../styles/css.bundle.css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [plugin],
  }
};

/*
 * Auto Prefixer :::: NOTE: To add browser specific css prefixed (--webkit, --moz etc)
 */
exports.autoprefixer = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require('autoprefixer')()],
  }
});

/*
 * Commons Chunk Plugin (vendor specific)
 */
exports.extractBundles = bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  ),
});

/*
 * JS Minification
 */
exports.minifyJavaScript = () => ({
  plugins: [new UglifyWebpackPlugin()],
});
