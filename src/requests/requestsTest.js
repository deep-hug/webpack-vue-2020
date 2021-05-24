import { get } from '../utils/httpServer';
import { BASE_URL_CONSTANT } from '../utils/constant.js';

class requestsTest {
    constructor() {

    }
    getAddressList(params) {
        return get('https://cnodejs.org/api/v1/topics', { params });
    }
    getMockData() {
        return get(`${BASE_URL_CONSTANT}/mock/data`);
    }
}

export default new requestsTest();