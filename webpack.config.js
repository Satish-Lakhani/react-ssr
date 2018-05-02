const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src/index.js"),
  build: path.join(__dirname, "public/javascripts")
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app
    },

    output: {
      path: PATHS.build,
      filename: "[name].js"
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, './src'), 'node_modules']
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
         }
      ]
    },
  }
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  parts.loadCSS(),

  parts.generateSourceMaps({
    type: "cheap-module-eval-source-map"
  }),
]);

const productionConfig = merge([
  {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ]
  },

  parts.extractCSS({
    use: ["css-loader", parts.autoprefixer()]
  }),

  // parts.generateSourceMaps({
  //   type: "source-map"
  // }),

  parts.extractBundles([
    {
      name: "vendor" ,
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }
  ]),

  parts.minifyJavaScript(),
]);

module.exports = env => {
  if (env === "prod") {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
}
