const path = require('path');

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const globalConfig = require('../global.config');
const commonConfig = require('./webpack.common');

const staticPublicPath = global.staticPublicPath;
const onlinePublishPathPrefix = global.onlinePublishPathPrefix;

module.exports = merge(commonConfig, {
    // 打包模式，区分本地/线上环境，并且针对不同的环境进行不同的优化
    mode: 'production',
    // eval 生产环境使用eval会使得打包后的文件太大
    devtool: 'cheap-module-source-map',
    // 打包输出目录, 对应一个绝对路径。
    output: {
        path: globalConfig.buildPath,
        // 静态资源访问目录，prod模式下访问Jenkins配置的静态资源目录
        publicPath: onlinePublishPathPrefix,
        filename: path.posix.join(staticPublicPath, 'js/[name].[hash].js')
    },
    plugins: [
        // 从 bundle 中提取文本（CSS）到单独的文件,生产中加上hash防止缓存
        new MiniCssExtractPlugin({
            filename: path.posix.join(staticPublicPath, 'css/[name].[hash].js'),
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"],
                        output: {
                            comments: false
                        },
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})