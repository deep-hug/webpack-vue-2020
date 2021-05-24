/**
 * @Description: webpack辅助工具类
 */
class webpackUtils {
    constructor() {
        this.ENV = process.env.npm_lifecycle_event;
    }
    /**
     * 获取打包环境，按照环境配置是否压缩和请求地址
     */
    getEnvConfig() {
        let config = {};
        switch (this.ENV) {
            // 开发环境：不压缩，公司测试地址
            case 'dev':
                config= {
                    IS_ENCRYPT: 'false',
                    BASE_URL: '"https://cnodejs.org"'
                };
                break;
            // mock环境：不压缩，开发环境地址
            case 'mock':
                config = {
                    IS_ENCRYPT: 'false',
                    BASE_URL: '"http://localhost:8080"'
                };
                break;
        }
        return config;
    }
}
module.exports = new webpackUtils();