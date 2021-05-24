/**
 * @Description: mock 环境配置
 */
const fs = require('fs');
const path = require('path');
const jsonc = require('jsonc');
/**
 * 读取mock目录下的data数据
 * @param {*} filename
 */
function fromJSONFile(filename) {
    return (req, res) => {
        const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}.json`)).toString();
        const json = jsonc.parse(data);
        return res.json(json);
    };
}
const proxy = {
    'GET /api/v1/topics': fromJSONFile('test/test'), //test
    'GET /mock/data': fromJSONFile('test/mock'), //mock

};
module.exports = proxy;
