import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1";

class TaskService {

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
