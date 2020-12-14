const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader');

const globalConfig = require('./global.config');
const appPath = globalConfig.appPath;
const buildPath = globalConfig.buildPath;
const staticPublicPath = globalConfig.staticPublicPath;


const config = {
    // 打包模式，区分本地/线上环境，并且针对不同的环境进行不同的优化
    mode: 'development',
    // 映射方式
    devtool: 'source-map',
    // 这里应用程序开始执行
    // webpack 开始打包
    entry: ['webpack-hot-middleware/client', path.resolve(__dirname, 'src/main.ts')],
    // 打包输出目录, 对应一个绝对路径。
    output: {
        path: buildPath,
        publicPath: '/',
        filename: path.posix.join(staticPublicPath, 'js/[name].js')
    },
    // 设置模块如何被解析
    resolve: {
        // 自动解析确定的扩展。能够使用户在引入模块时不带扩展.
        extensions: ['.ts', '.js', '.vue'],
    },
    // 这些选项决定了如何处理项目中的不同类型的模块。
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }, {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }]
        }, {
            // 加载图片文件，小于8M转化成base64
            test: /\.(png|jpe?g|git|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }, {
            test: /\.css/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }]
    },
    plugins: [
        new ESLintPlugin({
            emitError: true,
            emitWarning: true,
            extensions: ['.ts', '.js', '.vue'],
            formatter: require('eslint-formatter-friendly'),
          }),
        new webpack.HotModuleReplacementPlugin(),
        // 读取compiler.option.module.rule,找到给.vue文件进行配置的那些个rule
        // 然后匹配vue文件里的一些配置，比如script标签的lang字段
        new VueLoaderPlugin(),
        // 从 bundle 中提取文本（CSS）到单独的文件,顺便把style-loader也做了？
        new MiniCssExtractPlugin({
            filename: path.posix.join(staticPublicPath, 'css/[name].js'),
        }),
        // 创建 HTML 文件，用于服务器访问
        new HtmlWebpackPlugin({
            title: 'config-vue3',
            template: path.resolve(appPath, 'index.html'),
            favicon: path.resolve(appPath, 'assets/favicon.ico')
        }),
    ]
};


module.exports = config;