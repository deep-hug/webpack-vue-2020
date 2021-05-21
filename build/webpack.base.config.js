// 导入webpack
const webpack = require('webpack');
// 导入path模块
const path = require('path');
// 引入vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 引入html-webpack-plugin的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入clean-webpack-plugin的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入 copy-webpack-plugin 的插件
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // 打包入口
    entry: './src/main.js',
    // 打包出口
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    priority: 10,
                },
                components: {
                    test: '/[\\/]components[\\/]/',
                    name: 'components',
                    chunks: 'all',
                }
            }
        }
    },
    // 打包规则
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,  // 这里设置为false
                            limit: 8192,
                            name: 'images/[name].[ext]',  // 占位符
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
        ]
    },
    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/assets/static',
                to: 'static'
            }]
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ],
    resolve : {
        alias: {
            'vue': 'vue/dist/vue.js',
            '@assets': path.resolve(__dirname, '../src/assets'),  // 静态文件目录映射
            '@components': path.resolve(__dirname, '../src/components'),  // 组件目录映射
            '@pages': path.resolve(__dirname, '../src/pages'),  // 页面目录映射
            '@router': path.resolve(__dirname, '../src/router'),  // 路由目录映射
            '@utils': path.resolve(__dirname, '../src/utils'),  // 工具目录映射
        },
        fallback: {
            'fs': false,
            'tls': false,
            'net': false,
            // 'path': false,
            'zlib': false,
            'http': false,
            'https': false,
            // 'stream': false,
            'crypto': false,
            // 'buffer': false,
            'constants': false,
            'assert': false,
            'crypto-browserify': false,
            'path': require.resolve('path-browserify'),
            'url': require.resolve('url'),
            'buffer': require.resolve('buffer/'),
            'util': require.resolve('util/'),
            'stream': require.resolve('stream-browserify/')
        }
    }
};