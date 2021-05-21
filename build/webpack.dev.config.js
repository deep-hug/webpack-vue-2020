const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
// 为了引入webpack内置的 HMR 的插件
const webpack = require('webpack');

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
        new webpack.DefinePlugin({
            // PROJECT_NAME: '"webpack-vue-2020"',  // 项目名称
            IS_ENCRYPT: 'false',
        })
    ],
};

module.exports = merge(baseConfig, devConfig);