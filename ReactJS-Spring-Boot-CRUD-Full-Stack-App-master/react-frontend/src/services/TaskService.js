import axios from 'axios';
import { getApiBaseUrl } from './apiBaseUrl';

const BASE_URL = getApiBaseUrl();

class TaskService {

    getAllTasks() {
        return axios.get(`${BASE_URL}/tasks`);
    }

    getTasksByEmployee(employeeId) {
        return axios.get(`${BASE_URL}/employees/${employeeId}/tasks`);
    }

    createTask(employeeId, task) {
        return axios.post(`${BASE_URL}/employees/${employeeId}/tasks`, task);
    }

    getTaskById(taskId) {
        return axios.get(`${BASE_URL}/tasks/${taskId}`);
    }

    updateTask(taskId, task) {
        return axios.put(`${BASE_URL}/tasks/${taskId}`, task);
    }

    deleteTask(taskId) {
        return axios.delete(`${BASE_URL}/tasks/${taskId}`);
    }
}

export default new TaskService();
