import axios from 'axios';
import { getHeaders } from './headers'

const backendApiUrl = process.env.VUE_APP_BACKEND_API_URL;
const baseURL = `${backendApiUrl}`

function getConfig() {
    let headers = getHeaders();
    let config = {
        baseURL,
        headers
    };
    return config;
}

export default {
    get(url) {
        let config = getConfig();
        return axios.get(url, config);
    },
    post(url, payload) {
        let config = getConfig();
        return axios.post(url, payload, config);
    },
    put(url, payload) {
        let config = getConfig();
        return axios.put(url, payload, config);
    },
    delete(url) {
        let config = getConfig();
        return axios.delete(url, config);
    }
}