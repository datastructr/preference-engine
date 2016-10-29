let webpack = require('webpack');
let path = require('path');
let merge = require('merge');

/** plugins */
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/** file config */
const APPDIRECTORY = path.join(__dirname, '/client/app');
const ENTRYFILE    = path.join(__dirname, '/client/app/client/index.js');
const OUTPUTFILE   = path.join(__dirname, '/dist/');

/** base setup */
let webpackConfig = {
  output: {
    path: OUTPUTFILE,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};


switch(process.env.NODE_ENV) {
    /** prod setup */
    case "production":
        webpackConfig = merge(webpackConfig,{
        devtool: "cheap-module-source-map",
        entry : [ENTRYFILE],
        module: {
        loaders: [
            { test: /\.js$/, include: APPDIRECTORY , loader: 'babel'},
            { test: /\.(png|jpg|gif|jpeg)$/, include:  APPDIRECTORY , loader: 'url-loader?limit=8192'},
            { test: /\.css$/, include:  APPDIRECTORY , loader: ExtractTextPlugin.extract('style', 'css') },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader'}
        ]
        },
        plugins : [
        new webpack.DefinePlugin({
            'process.env': {
            'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('app.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
        ]
    });
    break;
    /** devel setup */
    case "development":
        webpackConfig = merge(webpackConfig,{
        devtool: 'inline-source-map',
        module: {
        loaders: [
            {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include:  APPDIRECTORY ,
            query: {
                presets: ['es2015', 'react', 'stage-2'],
                cacheDirectory: true,
                env: {
                    development: {
                        "plugins": [[
                            "react-transform", 
                                {
                                    "transforms": [
                                        {"transform": "react-transform-hmr", "imports": ["react"], "locals": ["module"]},
                                        {"transform": "react-transform-catch-errors", "imports": ["react", "redbox-react"]}
                                    ]
                                }
                        ]]
                    }
                }
            }
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=8192'},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(ttf|eot|svg|woff|gif|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
        },
        entry : [
            'webpack-hot-middleware/client',
            ENTRYFILE
        ],
        plugins : [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
    break;

}
  
module.exports = webpackConfig;