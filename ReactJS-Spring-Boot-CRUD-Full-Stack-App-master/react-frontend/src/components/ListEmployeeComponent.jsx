import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import './ListEmployeeComponent.css'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>Employees Directory</h2>
                    <button className="btn-add-modern" onClick={this.addEmployee}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Employee
                    </button>
                </div>
                
                <div className="table-responsive">
                    <table className="table-glass">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Contact Information</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key = {employee.id}>
                                         <td>
                                            <div className="employee-name-cell">
                                                <div className="avatar-initial">
                                                    {employee.firstName ? employee.firstName.charAt(0) : ''}
                                                    {employee.lastName ? employee.lastName.charAt(0) : ''}
                                                </div>
                                                <div>
                                                    <div style={{fontWeight: 600, color: '#1e293b', fontSize: '15px'}}>
                                                        {employee.firstName} {employee.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                         </td>   
                                         <td> 
                                            <span className="email-pill">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#94a3b8'}}>
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                                {employee.emailId}
                                            </span>
                                         </td>
                                         <td>
                                            <div className="action-buttons">
                                                <button onClick={ () => this.viewEmployee(employee.id)} className="btn-action-modern btn-action-view">View</button>
                                                <button onClick={ () => this.editEmployee(employee.id)} className="btn-action-modern btn-action-update">Edit</button>
                                                <button onClick={ () => this.deleteEmployee(employee.id)} className="btn-action-modern btn-action-delete">Delete</button>
                                            </div>
                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent
