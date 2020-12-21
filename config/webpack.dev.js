const path = require('path');

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const globalConfig = require('../global.config');
const commonConfig = require('./webpack.common');

const staticPublicPath = globalConfig.staticPublicPath;

const config = Object.assign({}, commonConfig);
const entry = config.entry;
entry.push('webpack-hot-middleware/client');

module.exports = merge(config, {
    // 打包模式，区分本地/线上环境，并且针对不同的环境进行不同的优化
    mode: 'development',
    // eval	打包后的模块都使用 eval() 执行
    // cheap   map映射只显示行不显示列，忽略源自 loader 的 source map
    // module	增加对 loader source map 和第三方模块的映射
    devtool: 'eval-cheap-module-source-map',
    // 打包输出目录, 对应一个绝对路径。
    output: {
        path: globalConfig.buildPath,
        // 静态资源访问目录，dev模式下打包在内存中，为根目录
        publicPath: '/',
        filename: path.posix.join(staticPublicPath, 'js/[name].js')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ESLintPlugin({
            // emitError: true,
            // emitWarning: true,
            extensions: ['.vue', '.ts', '.js'],
            formatter: require('eslint-formatter-friendly'),
        }),
        // 从 bundle 中提取文本（CSS）到单独的文件
        new MiniCssExtractPlugin({
            filename: path.posix.join(staticPublicPath, 'css/[name].js'),
        }),
    ]
})