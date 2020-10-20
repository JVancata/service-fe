const axios = require('axios').default;
const { REACT_APP_API_URL } = process.env;
export default class ApiClient {
    async getAllStatuses() {
        return await axios.get(`${REACT_APP_API_URL}/statuses`);
    }
    async getAllServicesLogs(interval = 7, limit = 20) {
        return await axios.get(`${REACT_APP_API_URL}/services/log?interval=${interval}&limit=${limit}`);
    }
    async getAllServices() {
        return await axios.get(`${REACT_APP_API_URL}/services`);
    }
}