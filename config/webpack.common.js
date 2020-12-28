const path = require('path');

const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader');

const globalConfig = require('../global.config');
const appPath = globalConfig.appPath;

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            ['@babel/preset-env'
                // {
                //     // 对api的转换采用按需加载
                //     useBuiltIns: 'usage',
                //     // https://babeljs.io/docs/en/babel-preset-env#corejs
                //     corejs: 3,
                //     modules: false,
                // }
            ]
        ],
        // "plugins": [
        //     [
        //         // api 从直接修改原型改为从统一的模块引入，避免对全局变量及其原型的污染。
        //         "@babel/plugin-transform-runtime",
        //         {
        //             "corejs": 3
        //         }
        //     ]
        // ]
    }
}

const config = {
    // webpack 从这里开始打包
    entry: [path.resolve(appPath, 'main.ts')],
    // 设置模块如何被解析
    resolve: {
        // 自动解析确定的扩展。能够使用户在引入模块时不带扩展.
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            '@': appPath,
        },
        fallback: {
            "buffer": require.resolve("buffer/"),
            "os": require.resolve("os-browserify/browser"),
            "path": require.resolve("path-browserify"),
        }
    },
    // 这些选项决定了如何处理项目中的不同类型的模块。
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [babelLoader]
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [babelLoader, {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }]
        }, {
            // 加载图片文件，小于8M转化成base64
            test: /\.(png|jpe?g|git|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }, {
            test: /\.scss/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                },
                'sass-loader'
            ]
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }]
    },
    plugins: [
        // 读取compiler.option.module.rule,找到给.vue文件进行配置的那些个rule
        // 然后匹配vue文件里的一些配置，比如script标签的lang字段
        new VueLoaderPlugin(),
        // 创建 HTML 文件，用于服务器访问
        new HtmlWebpackPlugin({
            title: 'vue3-boilerplate',
            template: path.resolve(appPath, 'index.html'),
            favicon: path.resolve(appPath, 'assets/favicon.ico')
        }),
        // 定义环境变量,通过shell脚本export的环境变量必须再次定义才能在业务代码里面使用
        // local/testing/release, 默认为本地 
        new webpack.DefinePlugin({
            'process.env': {
                RUNTIME_ENV: JSON.stringify(process.env.RUNTIME_ENV || 'local'),
                API_PREFIX: JSON.stringify(process.env.API_PREFIX || ''),
                BASE_URL: JSON.stringify(process.env.BASE_URL || '')
            }
        })
    ]
};


module.exports = config;