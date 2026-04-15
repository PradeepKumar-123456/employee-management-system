import axios from 'axios';
import { getApiBaseUrl } from './apiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

class AuthService {
    register(userAccount) {
        return axios.post(`${API_BASE_URL}/auth/register`, userAccount);
    }
}

export default new AuthService();