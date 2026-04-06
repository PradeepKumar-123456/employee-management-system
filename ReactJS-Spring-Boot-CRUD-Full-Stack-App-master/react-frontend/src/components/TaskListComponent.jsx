import React, { Component } from 'react';
import TaskService from '../services/TaskService';
import EmployeeService from '../services/EmployeeService';
import './TaskListComponent.css';

class TaskListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            employee: null,
            employeeId: this.props.match.params.id
        };
    }

    componentDidMount() {
        const { employeeId } = this.state;

        EmployeeService.getEmployeeById(employeeId).then(res => {
            this.setState({ employee: res.data });
        });

        TaskService.getTasksByEmployee(employeeId).then(res => {
            this.setState({ tasks: res.data });
        });
    }

    deleteTask = (taskId) => {
        TaskService.deleteTask(taskId).then(() => {
            this.setState({ tasks: this.state.tasks.filter(t => t.id !== taskId) });
        });
    }

    addTask = () => {
        this.props.history.push(`/employees/${this.state.employeeId}/add-task/_add`);
    }

    editTask = (taskId) => {
        this.props.history.push(`/employees/${this.state.employeeId}/add-task/${taskId}`);
    }

    goBack = () => {
        this.props.history.push('/employees');
    }

    getStatusClass(status) {
        if (!status) return 'todo';
        return status.toLowerCase().replace('_', '_');
    }

    getStatusIcon(status) {
        if (status === 'DONE') return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        );
        if (status === 'IN_PROGRESS') return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        );
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        );
    }

    getStatusLabel(status) {
        if (status === 'IN_PROGRESS') return 'In Progress';
        if (status === 'DONE') return 'Done';
        return 'To Do';
    }

    render() {
        const { employee, tasks } = this.state;
        const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Employee';

        return (
            <div className="tasks-page">
                <div className="tasks-page-header">
                    <div className="tasks-page-header-left">
                        <h2>📋 Tasks</h2>
                        <p>Managing tasks for <strong>{employeeName}</strong> · {tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="tasks-header-actions">
                        <button className="btn-back-modern" onClick={this.goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back
                        </button>
                        <button className="btn-add-task-modern" onClick={this.addTask}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Task
                        </button>
                    </div>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty-tasks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <h3>No tasks yet</h3>
                        <p>Click "Add Task" to assign the first task to {employeeName}.</p>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map(task => {
                            const statusClass = this.getStatusClass(task.status);
                            return (
                                <div className="task-card" key={task.id}>
                                    <div className="task-card-left">
                                        <div className={`status-icon ${statusClass}`}>
                                            {this.getStatusIcon(task.status)}
                                        </div>
                                        <div className="task-card-info">
                                            <p className="task-card-title">{task.title}</p>
                                            <p className="task-card-desc">{task.description || 'No description'}</p>
                                        </div>
                                    </div>
                                    <div className="task-card-right">
                                        {task.dueDate && (
                                            <span className="due-date">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                                {task.dueDate}
                                            </span>
                                        )}
                                        <span className={`status-badge ${statusClass}`}>
                                            {this.getStatusLabel(task.status)}
                                        </span>
                                        <div className="task-actions">
                                            <button className="btn-task-edit" onClick={() => this.editTask(task.id)}>Edit</button>
                                            <button className="btn-task-delete" onClick={() => this.deleteTask(task.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default TaskListComponent;
