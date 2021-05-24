const baseConfig = require('./webpack.base.config.js');
// 引入 mini-css-extract-plugin 的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入 optimize-css-assets-webpack-plugin 的插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 引入 terser-webpack-plugin 的插件  (压缩js)
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const buildConfig = {
    // 打包方式（生产环境）
    mode: 'production',//production (生产环境)  development (开发环境)
    output: {
        filename: 'js/[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        // 定义全局数据
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
};
module.exports = merge(baseConfig, buildConfig);