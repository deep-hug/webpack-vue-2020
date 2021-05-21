/**
 * @Description: 本地数据管理类
 */
import Encrypt from './encrypt.js';
import { IS_ENCRYPT_CONSTANT } from './constant.js';
class storage {
    constructor() {
        this.aesKey = 'c2v8vthjb7ojfa5u';  // aes加密key
        this.requestHeader = 'header';  // 请求头本地信息
        this.userInfo = 'userInfo'; //用户信息
        this.bridge = 'bridge'; // 数据桥
    }

    /**
     * 加密存储
     * @param {*} key
     * @param {*} value
     */
    es(key, value) {
        let val = value;
        if ((typeof value).toLocaleLowerCase() === 'object') {
            val = JSON.stringify(value);
        }
        let data = IS_ENCRYPT_CONSTANT ? Encrypt.aesEncrypt(val, this.aesKey) : val;
        sessionStorage.setItem(key, data);
    }

    /**
     * 解密获取
     * @param {*} key
     */
    dg(key) {
        let localData = sessionStorage.getItem(key) || '';
        let data = localData && (IS_ENCRYPT_CONSTANT ? Encrypt.aesDecrypt(localData, this.aesKey) : localData);
        let result = '';
        try {
            result = JSON.parse(data);
        } catch (error) {
            result = data;
        }
        return result;
    }

    /**
     * 设置本地的请求头信息
     * @param {存放的值} value
     */
    setRequestHeader(value) {
        this.es(this.requestHeader, value);
    }

    /**
     * 获取本地的请求头信息
     */
    getRequestHeader() {
        return this.dg(this.requestHeader);
    }

    /**
     * 设置本地的用户信息
     * @param {存放的值} value
     */
    setUserInfo(value) {
        this.es(this.userInfo, value);
    }

    /**
     * 获取本地的用户信息
     */
    getUserInfo() {
        return this.dg(this.userInfo);
    }

    /**
     * 设置桥数据
     * @param {*} value
     */
    setBridge(value) {
        this.es(this.bridge, value);
    }

    /**
     * 获取桥数据
     */
    getBridge() {
        return this.dg(this.bridge);
    }

}
export default new storage();