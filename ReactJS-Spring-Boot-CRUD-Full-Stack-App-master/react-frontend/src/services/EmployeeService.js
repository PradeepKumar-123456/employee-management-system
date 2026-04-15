import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

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