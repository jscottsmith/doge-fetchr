const webpack = require('webpack');
const createBabelConfig = require('./babelrc');
const path = require('path');

const ROOT = path.resolve('./');
const DIST = path.resolve('./dist');
const SRC = path.resolve('./src');

const clientConfig = {
    devServer: {
        contentBase: DIST,
        watchContentBase: true,
        compress: false,
        port: 3000,
    },

    entry: ['whatwg-fetch', path.resolve(SRC + '/client.js')],

    output: {
        path: DIST,
        filename: 'bundle.js',
    },

    resolve: {
        alias: {
            components: path.resolve(SRC + '/components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.js$/,
                include: [SRC],
                loader: 'babel-loader',
                query: createBabelConfig(),
            },
            {
                test: /\.scss$/,
                include: [SRC],
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = [clientConfig];
