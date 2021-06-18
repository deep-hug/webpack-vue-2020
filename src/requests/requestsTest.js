import { get, post } from '../utils/httpServer';
import { BASE_URL_CONSTANT } from '../utils/constant.js';

class requestsTest {
    constructor() {

    }
    getAddressList(params) {
        return get(BASE_URL_CONSTANT+'/api/v1/topics', { params });
    }
    getMockData() {
        return get(BASE_URL_CONSTANT + '/api/mock/data');
    }
    login(data) {
        return post(BASE_URL_CONSTANT + '/proxy/fdapp/oauth/v1/token', { data, headers: { 'Resource-type': 'bigscreen-maternalchild', }, } );
    }
}

export default new requestsTest();