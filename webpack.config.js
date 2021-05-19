// 导入path模块
const path = require('path');
// 引入vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 打包方式（开发）
    mode: 'development',
    // 打包入口
    entry: './src/main.js',
    // 打包出口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 打包规则
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    // 插件
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve : {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
}