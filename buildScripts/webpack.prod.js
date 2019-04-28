import path from 'path';
import chalk from 'chalk';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let version = require("./../package.json").version;
let argv = require('yargs').argv;

const nodeModulesDir = path.resolve(__dirname, './../node_modules');


export default {
    mode: 'production',
    entry: {
        main: [path.resolve(__dirname, './../src/main')]
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './../docs/'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new UglifyJsPlugin()
    ],
    module: {

        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }, ],
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
            },
        ]

    }
}