const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'CHILD_APP_CONFIG': JSON.stringify(require('./child-config.json')),
            'ROUTE_CONFIG': JSON.stringify(require('./route-config.json'))
          })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
        open: true
    }
};