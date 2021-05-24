const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
// 为了引入webpack内置的 HMR 的插件
const webpack = require('webpack');
// 引入mocker-api
const apiMocker = require('mocker-api');
const path = require('path');

const devConfig = {
    // 打包方式（开发环境）
    mode: 'development',//production (生产环境)
    output: {
        filename: 'js/[name].bundle.js'
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        // 指定服务器根目录
        contentBase: './dist',
        // 浏览器自动打开
        open: true,
        hot: true,
        // historyApiFallback: true,  // 路由history模式(暂时不打开)


        // compress: true, // 启动gzip压缩
        // port: 3000, // 端口号
        // quiet:true
    },
    // 打包规则
    module: {
        rules: [
            {
                test: /\.(sass|scss|less|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 定义全局数据
    ],
};
if (process.env.npm_lifecycle_event == 'mock') {
    // mock环境，启用mock代理服务，不走代理
    devConfig.devServer.before = (app) => {
        // mock的api
        apiMocker(app, path.resolve(__dirname, '../src/mock/api.js'));
    };
    devConfig.devServer.proxy = {
        '/proxy': {
            target: 'http://localhost: 3300',  // 代理到生产地址
            changeOrigin: true,  // 是否跨域
            secure: false,  // https的时候使用该参数
            pathRewrite: {'^/proxy': ''}
        }
    };
}
module.exports = merge(baseConfig, devConfig);