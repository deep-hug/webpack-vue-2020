/*
 * @Description: 基于axios的ajax请求封装
 */
import axios from 'axios';
import router from '../router/index.js';
// import { getRequestHeader } from './storage';
import { Message, Loading } from 'element-ui';
import {
    randomStr,
    aesEncrypt,
    pan,
    dora,
    getUrlParams,
    parseRes,
    backdoor,
    rsaEncrypt,
} from '../../common/utils/encrypt.js';
import { IS_ENCRYPT_CONSTANT } from './constant.js';

/**
 * 基于axios 的请求拦截器
 */
axios.interceptors.request.use(
    (config) => {
        !config.headers && (config.headers = {});
        const str = randomStr();
        const encryptStr = rsaEncrypt(str);
        // const requestHeader = getRequestHeader();
        // const token = requestHeader && requestHeader['access-token'];
        // if (token) {
        //     config.headers['access-token'] = token;
        // }
        !IS_ENCRYPT_CONSTANT && (config.headers[backdoor] = !IS_ENCRYPT_CONSTANT);
        if (config.method == 'get') {
            if (IS_ENCRYPT_CONSTANT) {
                config.headers[pan] = encryptStr;
                if (config.params && JSON.stringify(config.params) != '{}') {
                    let urlPanStr = getUrlParams(config.params);
                    if (urlPanStr) {
                        config.params = {};
                        config.params[dora] = aesEncrypt(urlPanStr, str);
                    }
                }
            }
        } else {
            if (IS_ENCRYPT_CONSTANT) {
                config.headers[pan] = encryptStr;
                if (config.data && JSON.stringify(config.data) != '{}') {
                    const data = {};
                    data[dora] = aesEncrypt(JSON.stringify(config.data), str);
                    config.data = data;
                }
            }
        }
        return config;
    },
    (error) => {
        throw new Error(error);
    }
);
/**
 * 基于baseHttp封装的get请求
 * @param {请求地址} url
 * @param {请求入参} params
 * @param {其他} options
 */
export function get(url, config, options) {
    const httpConfig = Object.assign({ url: url, method: 'get' }, config);
    return baseHttp(httpConfig, options);
}

/**
 * 基于baseHttp封装的post请求
 * @param {请求地址} url
 * @param {请求入参} params
 * @param {其他} options
 */
export function post(url, config, options) {
    const httpConfig = Object.assign({ url: url, method: 'post' }, config);
    return baseHttp(httpConfig, options);
}
/**
 * 基于baseHttp封装的delete请求
 * @param {请求地址} url
 * @param {请求入参} params
 * @param {其他} options
 */
export function del(url, config, options) {
    const httpConfig = Object.assign({ url: url, method: 'delete' }, config);
    return baseHttp(httpConfig, options);
}
/**
 * 基于baseHttp封装的put请求
 * @param {请求地址} url
 * @param {请求入参} params
 * @param {其他} options
 */
export function put(url, config, options) {
    const httpConfig = Object.assign({ url: url, method: 'put' }, config);
    return baseHttp(httpConfig, options);
}
/**
 * 基于axios封装的异步请求
 * @param {请求地址} url
 * @param {请求类型} method
 * @param {请求参数} params
 * @param {其他} options
 */
export function baseHttp(httpConfig, options) {
    const showLoading = options && options.closeLoading ? !options.closeLoading : true;
    const showToast = options && options.closeToast ? !options.closeToast : true;
    return new Promise((resolve, reject) => {
        let loadingInstance = '';
        if (showLoading) {
            loadingInstance = Loading.service({ fullscreen: true });
        }
        axios(httpConfig)
            .then((result) => {
                showLoading && loadingInstance.close();
                resolve(IS_ENCRYPT_CONSTANT ? parseRes(result) : result.data);
            })
            .catch((error) => {
                showLoading && loadingInstance.close();
                let errorObj;
                if (error.response) {
                    //回应错误信息处理
                    errorObj = IS_ENCRYPT_CONSTANT ? parseRes(error.response) : error.response.data;
                } else if (error.request) {
                    //请求前错误信息处理
                    errorObj = {
                        status: 500,
                        message: '网络异常',
                    };
                } else {
                    //其他错误
                    errorObj = error;
                }
                showToast && Message.error(errorObj.message || '请求异常');
                if(errorObj.status == '403'){
                    if(router.currentRoute.path != '/login'){
                        router.push({
                            path:'/login'
                        });
                    }
                    
                }
                reject(errorObj);
            });
    });
}
