import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import './CreateEmployeeComponent.css';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            errorMessage: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            }).catch(error => {
                this.setState({errorMessage: "Could not fetch employee details. Is the backend running?"});
            });
        }        
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        // Basic validation
        if(!this.state.firstName || !this.state.lastName || !this.state.emailId) {
            this.setState({errorMessage: "Please fill in all fields before saving."});
            return;
        }

        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        this.setState({errorMessage: ''}); // Clear previous errors

        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            }).catch(error => {
                this.setState({errorMessage: "Failed to save employee. Please make sure the backend is running! Error: " + error.message});
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            }).catch(error => {
                this.setState({errorMessage: "Failed to update employee. Please make sure the backend is running! Error: " + error.message});
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3>Add New Employee</h3>
        }else{
            return <h3>Update Employee</h3>
        }
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-header">
                    {this.getTitle()}
                </div>

                {this.state.errorMessage && (
                    <div className="error-banner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {this.state.errorMessage}
                    </div>
                )}

                <form>
                    <div className="form-group-modern">
                        <label>First Name</label>
                        <input 
                            placeholder="Enter first name" 
                            name="firstName" 
                            className="form-control-modern" 
                            value={this.state.firstName} 
                            onChange={this.changeFirstNameHandler}
                        />
                    </div>
                    <div className="form-group-modern">
                        <label>Last Name</label>
                        <input 
                            placeholder="Enter last name" 
                            name="lastName" 
                            className="form-control-modern" 
                            value={this.state.lastName} 
                            onChange={this.changeLastNameHandler}
                        />
                    </div>
                    <div className="form-group-modern">
                        <label>Email Address</label>
                        <input 
                            placeholder="Enter email address" 
                            name="emailId" 
                            className="form-control-modern" 
                            value={this.state.emailId} 
                            onChange={this.changeEmailHandler}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel-modern" onClick={this.cancel.bind(this)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save-modern" onClick={this.saveOrUpdateEmployee}>
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateEmployeeComponent
