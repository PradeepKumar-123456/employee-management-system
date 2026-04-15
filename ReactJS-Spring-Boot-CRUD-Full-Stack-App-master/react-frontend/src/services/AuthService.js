import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

class AuthService {
    register(userAccount) {
        return axios.post(`${API_BASE_URL}/auth/register`, userAccount);
    }
}

export default new AuthService();