import axios from 'axios';

class RequestService {

  constructor() {
    /**
     * Default socket endpoint
     * @type {string}
     */
    this.apiUrl = 'http://192.168.100.67:3000';
    /**
     * Axios instance
     * @type {AxiosInstance}
     */
    this.axios = axios.create({
      baseURL: `${this.apiUrl}/api/v1`
    })
  }
}

export default new RequestService();