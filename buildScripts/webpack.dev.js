import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";


let argv = require('yargs').argv;
let DEV_SERVER_PORT = 3000;


const nodeModulesDir = path.resolve(__dirname, './../node_modules');

export default {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        contentBase: './src',
        compress: true,
        port: DEV_SERVER_PORT,
        inline: true,
        stats: 'minimal',
        historyApiFallback: {
            index: '/'
        }
    },
    entry: {
        main: [path.resolve(__dirname, './../src/main.js')]
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            devServer: 'http://localhost:' + DEV_SERVER_PORT,
            baseHref: '/',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    module: {

        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: [nodeModulesDir]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "resolve-url-loader" }
                ],
                exclude: [nodeModulesDir]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "resolve-url-loader" },
                    { loader: "sass-loader?sourceMap" }
                ],
                exclude: [nodeModulesDir]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            }
        ]

    }
}