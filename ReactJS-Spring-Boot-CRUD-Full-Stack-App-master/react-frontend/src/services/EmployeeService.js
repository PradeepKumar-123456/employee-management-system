import axios from 'axios';
import { getApiBaseUrl } from './apiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

class EmployeeService {

    getEmployees(){
        return axios.get(`${API_BASE_URL}/employees`);
    }

    createEmployee(employee){
        return axios.post(`${API_BASE_URL}/employees`, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(`${API_BASE_URL}/employees/${employeeId}`);
    }

    updateEmployee(employee, employeeId){
        return axios.put(`${API_BASE_URL}/employees/${employeeId}`, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(`${API_BASE_URL}/employees/${employeeId}`);
    }
}

export default new EmployeeService()