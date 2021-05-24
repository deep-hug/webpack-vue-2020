/**
 * @Author: MaxTan
 * @Description: 加密工具类
 * @Date: 2019/11/20 15:11:08
 * 2020-12-16 安全升级
 * 2020-12-28 敏感词可读性提升
 */
 import CryptoJS from 'crypto-js';
 import NodeRSA from 'node-rsa';
 /**
  * 字典随机差值
  */
 export function randomNum() {
     return 23;
 }
 /**
  * 敏感词字典
  */
 export function getDic() {
     const l = {};
     for (let i = 0; i < 128; i++) {
         const k = randomNum() + i;
         l[k] = String.fromCharCode(i);
     }
     return l;
 }
 /**
  * 敏感词编译器
  * @param {*} arr
  */
 export function transDic(arr) {
     const l = getDic();
     let result = '';
     if (arr && arr.length) {
         arr.forEach(item => {
             if (l[item]) {
                 result += l[item];
             }
         });
         return result;
     } else {
         return arr;
     }
 }
 export const dora = transDic([123, 134, 137, 120]); //dora
 export const pan = transDic([135, 120, 133]); //pan
 export const encrypt = transDic([124, 133, 122, 137, 144, 135, 139]); //encrypt
 export const decrypt = transDic([123, 124, 122, 137, 144, 135, 139]); //decrypt
 export const CBC = transDic([90, 89, 90]); //CBC
 export const Pkcs7 = transDic([103, 130, 122, 138, 78]); //Pkcs7
 export const pkcs1 = transDic([135, 130, 122, 138, 72]); //pkcs1
 export const decryptPublic = transDic([
     123,
     124,
     122,
     137,
     144,
     135,
     139,
     103,
     140,
     121,
     131,
     128,
     122
 ]); //decryptPublic
 export const backdoor = transDic([121, 120, 122, 130, 123, 134, 134, 137]); //backdoor
 export const AES = transDic([88, 92, 106]); //AES
 export const Base64 = transDic([89, 120, 138, 124, 77, 75]); //Base64
 export const base64 = transDic([121, 120, 138, 124, 77, 75]); //base64
 export const utf8 = transDic([140, 139, 125, 79]); //utf8
 export const Utf8 = transDic([108, 139, 125, 79]); //Utf8
 export const encryptionScheme = transDic([
     124,
     133,
     122,
     137,
     144,
     135,
     139,
     128,
     134,
     133,
     106,
     122,
     127,
     124,
     132,
     124
 ]); //encryptionScheme
 /**
  * 随机串，返回16位随机数字或字母
  */
 export function randomStr() {
     const S4 = function() {
         return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
     };
     return `${S4()}${S4()}${S4()}${S4()}`;
 }
 /**
  * aes加密
  * @param {待加密数据} encryptData
  * @param {秘钥} aesKey
  */
 export function aesEncrypt(encryptData, aesKey) {
     let result = '';
     const secretPassphrase = CryptoJS.enc[Utf8].parse(aesKey);
     try {
         const cipherText = CryptoJS[AES][encrypt](
             encryptData,
             secretPassphrase,
             {
                 mode: CryptoJS.mode[CBC],
                 padding: CryptoJS.pad[Pkcs7],
                 iv: secretPassphrase
             }
         );
         result = CryptoJS.enc[Base64].stringify(cipherText.ciphertext);
         // console.log(`加密文本: ${result}`);
     } catch (error) {
         console.log(error);
     }
     return result;
 }
 /**
  *
  * @param {待解密数据} decryptedData
  * @param {秘钥} aesKey
  */
 export function aesDecrypt(decryptedData, aesKey) {
     const secretPassphrase = CryptoJS.enc[Utf8].parse(aesKey);
     let result = '';
     try {
         const decrypted = CryptoJS[AES][decrypt](
             decryptedData,
             secretPassphrase,
             {
                 mode: CryptoJS.mode[CBC],
                 padding: CryptoJS.pad[Pkcs7],
                 iv: secretPassphrase
             }
         );
         result = decrypted.toString(CryptoJS.enc[Utf8]);
         // console.log(`解密文本: ${result}`);
     } catch (error) {
         console.log(error);
     }
     return result;
 }
 /**
  * rsa 解密
  * @param {aes解密串} decryptedData
  */
 export function rsaDecrypt(decryptedData) {
     let result = '';
     const publicKey = getPan();
     const key = new NodeRSA(publicKey);
     try {
         const o = {};
         o[encryptionScheme] = pkcs1;
         key.setOptions(o);
         result = key[decryptPublic](decryptedData, utf8);
     } catch (error) {
         console.log(error);
     }
     return result;
 }
 /**
  * 获取rsa公钥
  */
 export function getPan() {
     //'TUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDRDZyaHdYUnd6eWhuVFZ2'
     let baseStr1 = transDic([
         107,
         108,
         131,
         95,
         113,
         130,
         72,
         89,
         100,
         92,
         123,
         91,
         108,
         74,
         93,
         95,
         108,
         71,
         131,
         128,
         100,
         71,
         105,
         105,
         105,
         108,
         97,
         89,
         108,
         109,
         109,
         89,
         104,
         107,
         105,
         95,
         107,
         130,
         93,
         92,
         104,
         71,
         97,
         135,
         108,
         108,
         139,
         90,
         113,
         72,
         93,
         91,
         105,
         91,
         113,
         144,
         120,
         95,
         123,
         112,
         108,
         133,
         123,
         77,
         124,
         110,
         127,
         140,
         109,
         93,
         113,
         73
     ]);
     // 'T2hIWTE1MG05QWdGMEFvUHFWRjVEL21uenNTQzFyRUI3ekR0VjNxSmZxcE5LeU5xMzFycXRy'
     let baseStr2 = transDic([
         107,
         73,
         127,
         96,
         110,
         107,
         92,
         72,
         100,
         94,
         71,
         76,
         104,
         110,
         123,
         94,
         100,
         92,
         93,
         141,
         108,
         95,
         93,
         110,
         105,
         129,
         109,
         92,
         99,
         73,
         72,
         140,
         124,
         133,
         101,
         107,
         104,
         145,
         93,
         144,
         105,
         108,
         96,
         74,
         124,
         130,
         105,
         71,
         109,
         129,
         101,
         143,
         106,
         132,
         113,
         143,
         122,
         92,
         76,
         99,
         124,
         108,
         76,
         143,
         100,
         145,
         93,
         144,
         122,
         111,
         105,
         144
     ]);
     // 'UHZNbU1wdFdxSk5UbWkrN0lXaXN3YUo2MlZiNW12alJ2VmV3VmFmeUU4ajJhd2JtWDB1SzMv';
     let baseStr3 = transDic([
         108,
         95,
         113,
         101,
         121,
         108,
         72,
         142,
         123,
         93,
         123,
         143,
         106,
         130,
         76,
         108,
         121,
         110,
         130,
         137,
         101,
         71,
         131,
         111,
         120,
         111,
         101,
         74,
         112,
         108,
         134,
         73,
         100,
         131,
         113,
         128,
         101,
         110,
         72,
         73,
         120,
         131,
         97,
         73,
         109,
         132,
         109,
         74,
         109,
         132,
         93,
         132,
         124,
         108,
         108,
         75,
         120,
         129,
         97,
         127,
         123,
         73,
         97,
         139,
         110,
         91,
         89,
         72,
         106,
         145,
         100,
         141
     ]);
     // 'aE5FYUZHdG91UUNoY2ZOVENhMFRKNEtLYjA0Zm4vMllhRnZYc0hEVWpEUmZodmF3SURBUUFC';
     let baseStr4 = transDic([
         120,
         92,
         76,
         93,
         112,
         108,
         113,
         95,
         123,
         94,
         80,
         72,
         108,
         108,
         101,
         134,
         112,
         73,
         113,
         102,
         109,
         92,
         101,
         127,
         100,
         93,
         105,
         98,
         101,
         92,
         139,
         99,
         112,
         129,
         88,
         71,
         113,
         132,
         75,
         141,
         100,
         131,
         131,
         127,
         105,
         133,
         113,
         112,
         122,
         71,
         127,
         92,
         109,
         110,
         135,
         92,
         108,
         132,
         113,
         134,
         123,
         132,
         93,
         74,
         106,
         108,
         105,
         89,
         108,
         108,
         93,
         90
     ]);
     // 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0='
     let baseStr5 = transDic([
         99,
         106,
         71,
         139,
         99,
         106,
         72,
         90,
         105,
         108,
         123,
         97,
         107,
         128,
         89,
         104,
         109,
         108,
         97,
         100,
         106,
         108,
         100,
         126,
         106,
         71,
         109,
         113,
         99,
         106,
         71,
         139,
         99,
         106,
         71,
         84
     ]);
     // 'LS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'
     let baseStr6 = transDic([
         99,
         106,
         71,
         139,
         99,
         106,
         72,
         93,
         107,
         130,
         104,
         126,
         108,
         93,
         109,
         90,
         107,
         92,
         131,
         91,
         96,
         92,
         139,
         93,
         110,
         106,
         71,
         139,
         99,
         106,
         71,
         139
     ]);
     let baseArr = [baseStr5, baseStr1, baseStr3, baseStr2, baseStr4, baseStr6];
     let textString = '';
     baseArr.forEach(item => {
         let words = CryptoJS.enc[Base64].parse(item);
         textString += CryptoJS.enc[Utf8].stringify(words);
     });
     return textString;
 }
 /**
  * rsa 加密
  * @param {rsa加密串} encryptData
  */
 export function rsaEncrypt(encryptData) {
     let result = '';
     const publicKey = getPan();
     const key = new NodeRSA(publicKey);
     try {
         const o = {};
         o[encryptionScheme] = pkcs1;
         key.setOptions(o);
         result = key[encrypt](encryptData, base64, utf8);
     } catch (error) {
         console.log(error);
     }
     return result;
 }
 /**
  * 判断是否为空
  * @param {*} str
  */
 export function IsNotEmpty(str) {
     return (
         str !== '' ||
         str !== null ||
         str !== undefined ||
         str !== 'undefined' ||
         str !== 'null'
     );
 }
 /**
  * 获取get请求参数
  * @param {入参对象} obj
  */
 export function getUrlParams(obj) {
     let result = '';
     for (let i in obj) {
         if (IsNotEmpty(obj[i])) {
             result += result == '' ? `${i}=${obj[i]}` : `&${i}=${obj[i]}`;
         }
     }
     return result;
 }
 /**
  * 解析dora数据
  * @param {返回值} result
  */
 export function parseRes(result) {
     if (!result) {
         return;
     }
     //获取aes key
     let key = '';
     if (result && result.headers && result.headers[pan]) {
         key = rsaDecrypt(result.headers[pan]);
     }
     if (result.data && result.data[dora] && key) {
         let resultStr = aesDecrypt(result.data[dora], key);
         if (resultStr) {
             return isJSON(resultStr)
                 ? JSON.parse(resultStr)
                 : {
                       message: resultStr
                   };
         } else {
             return result.data;
         }
     } else {
         return result.data;
     }
 }
 /**
  * 判断是否json文本串
  * @param {字符串} str
  */
 export function isJSON(str) {
     if (typeof str === 'string') {
         try {
             JSON.parse(str);
             return true;
         } catch (e) {
             return false;
         }
     }
 }
 