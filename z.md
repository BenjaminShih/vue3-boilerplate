创建文件

npm init

npm i vue@3.0.0

创建目录

main.js主入口文件

main.js 中需引入App.vue

创建App.vue

创建components => HelloWorld.vue

在App.vue里注册组件

main.js => import createApp => createApp(App).mount('#app')

安装webpack

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```
npm install --save-dev webpack-cli
```


使用ts来写webpack
npm install --save-dev typescript ts-node @types/node @types/webpack

ts初始化
tsc --init

添加脚本

```
"scripts": {
    "start": "webpack --config webpack.dev.ts"
}
```

配置webpack.common.ts

安装ts-loader

vue-loader


npm i mini-css-extract-plugin -D
注意ExtractTextWebpackPlugin已经弃用

npm install --save-dev html-webpack-plugin

设置output

注意publicPath的含义, 区分path.posix.join()、path.resolve()和path.join()

babel 相关的预先配置

npm install --save-dev @babel/preset-typescript

npm install -D @babel/core @babel/preset-env

配置express,结合webpack

直接参考原有server.js

 npm i webpack-dev-middleware open webpack-hot-middleware connect-history-api-fallback http-proxy-middleware express -D

 补充 ip,port,domain,cdn地址到global.config

增加 start script

npm i ip -D

ns

httpProxyMiddleware书写方式改变

webpackDevMiddleware没有stats选项了

css-loader, postcss忘记装了

需要添加模板html

需要安装前置依赖 vue-template-compiler

倒腾半天发现不是上面的，是"@vue/compiler-sfc": "^3.0.4",

加载图片 

npm install url-loader --save-dev 

options中的name貌似在新版中没有了


ts找不到vue类型
// shims-vue.d.ts
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}

======= 可启动 ====

npm install vue-router@4

热加载不行

添加HotModuleReplacementPlugin 但是会引起mini-css-extract-plugin找不到normallizeurl文件

暂放这个问题，先配置vuex

vuex配置完毕

vuex中module需要加namespace: true才能局部注册

又不能ns成功了

检查发现是webpack resolve extensions的问题

扩展名之前需要加.

安装eslint

eslint-plugin-vue配置vue的校验规则

const ESLintPlugin = require('eslint-webpack-plugin'); 
代替了es-loader

无法解析vue 中的html, 或者无法识别ts

  parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },

webpack-dev-server中的overlay貌似也没什么用，不知道什么鬼

不管了

参照 http://ybbgit.cloudbae.cn:36112/frontend-public/wiki/blob/master/%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC%E8%87%AA%E5%8A%A8%E5%8C%96.md#%E4%B8%80commitizen 文档





