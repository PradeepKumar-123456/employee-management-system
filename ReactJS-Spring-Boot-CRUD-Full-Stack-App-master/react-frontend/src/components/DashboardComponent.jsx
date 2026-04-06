import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import TaskService from '../services/TaskService';
import './DashboardComponent.css';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            tasks: [],
            loading: true
        };
    }

    componentDidMount() {
        Promise.all([
            EmployeeService.getEmployees(),
            TaskService.getAllTasks()
        ]).then(([empRes, taskRes]) => {
            this.setState({
                employees: empRes.data || [],
                tasks: taskRes.data || [],
                loading: false
            });
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    getTaskCounts() {
        const { tasks } = this.state;
        const todo = tasks.filter(t => t.status === 'TODO').length;
        const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
        const done = tasks.filter(t => t.status === 'DONE').length;
        const total = tasks.length;
        return { todo, inProgress, done, total };
    }

    getProgressWidth(count, total) {
        if (total === 0) return 0;
        return Math.round((count / total) * 100);
    }

    getEmployeeName(empId) {
        const emp = this.state.employees.find(e => e.id === empId);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown Employee';
    }

    navigateTo(path) {
        this.props.history.push(path);
    }

    render() {
        const { employees, tasks, loading } = this.state;
        const { todo, inProgress, done, total } = this.getTaskCounts();
        const recentEmployees = employees.slice(-5).reverse();
        const recentTasks = tasks.slice(-5).reverse();

        const now = new Date();
        const hour = now.getHours();
        const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

        return (
            <div className="dashboard-page">

                {/* Welcome Banner */}
                <div className="dashboard-welcome">
                    <div className="welcome-text">
                        <h1>👋 {greeting}, Admin!</h1>
                        <p>Here's what's happening with your team today.</p>
                    </div>
                    <div className="welcome-actions">
                        <button className="btn-welcome btn-welcome-primary" onClick={() => this.navigateTo('/add-employee/_add')}>
                            + Add Employee
                        </button>
                        <button className="btn-welcome btn-welcome-secondary" onClick={() => this.navigateTo('/employees')}>
                            View All Employees
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="stats-grid">
                    <div className="stat-card employees" onClick={() => this.navigateTo('/employees')} style={{cursor:'pointer'}}>
                        <div className="stat-icon employees">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{employees.length}</h3>
                            <p>Total Employees</p>
                        </div>
                    </div>

                    <div className="stat-card todo">
                        <div className="stat-icon todo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{todo}</h3>
                            <p>Tasks To Do</p>
                        </div>
                    </div>

                    <div className="stat-card progress">
                        <div className="stat-icon progress">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{inProgress}</h3>
                            <p>In Progress</p>
                        </div>
                    </div>

                    <div className="stat-card done">
                        <div className="stat-icon done">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{done}</h3>
                            <p>Tasks Done</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="bottom-grid">

                    {/* Left Column */}
                    <div className="left-column">
                        {/* Recent Employees */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Recent Employees</h3>
                                <button className="panel-link" onClick={() => this.navigateTo('/employees')}>View all →</button>
                            </div>

                            {loading ? (
                                <div className="empty-panel">Loading...</div>
                            ) : recentEmployees.length === 0 ? (
                                <div className="empty-panel">No employees yet. Add your first employee!</div>
                            ) : (
                                recentEmployees.map(emp => (
                                    <div className="employee-row" key={emp.id}>
                                        <div className="emp-avatar">
                                            {(emp.firstName || '?').charAt(0)}{(emp.lastName || '').charAt(0)}
                                        </div>
                                        <div className="emp-info">
                                            <h4>{emp.firstName} {emp.lastName}</h4>
                                            <p>{emp.emailId}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Recent Tasks */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Latest Tasks</h3>
                            </div>

                            {loading ? (
                                <div className="empty-panel">Loading...</div>
                            ) : recentTasks.length === 0 ? (
                                <div className="empty-panel">No tasks found. Create tasks for employees to see them here.</div>
                            ) : (
                                recentTasks.map(task => (
                                    <div className="task-row" key={task.id} onClick={() => this.navigateTo(`/employees/${task.employeeId}/tasks`)} style={{cursor:'pointer'}}>
                                        <div className="task-main">
                                            <div className={`task-icon-small ${task.status.toLowerCase()}`}>
                                                {task.status === 'DONE' ? '✓' : task.status === 'IN_PROGRESS' ? '⏳' : '📋'}
                                            </div>
                                            <div className="task-info-small">
                                                <h4>{task.title}</h4>
                                                <p>Assigned to: {this.getEmployeeName(task.employeeId)}</p>
                                            </div>
                                        </div>
                                        <div className="task-meta-small">
                                            <span className={`task-badge-mini ${task.status.toLowerCase()}`}>{task.status.replace('_', ' ')}</span>
                                            {task.dueDate && <span className="task-date-mini">Due: {task.dueDate}</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>

                        {/* Task Overview */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Task Overview</h3>
                                <span style={{fontSize:'13px', color:'#94a3b8'}}>{total} total</span>
                            </div>

                            {total === 0 ? (
                                <div className="empty-panel">No tasks assigned yet.</div>
                            ) : (
                                <>
                                    <div className="task-overview-item">
                                        <div className="task-label-row">
                                            <div className="task-label">
                                                <div className="task-dot todo"></div>
                                                <span>To Do</span>
                                            </div>
                                            <span className="task-count">{todo}</span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill fill-todo" style={{width: `${this.getProgressWidth(todo, total)}%`}}></div>
                                        </div>
                                    </div>

                                    <div className="task-overview-item">
                                        <div className="task-label-row">
                                            <div className="task-label">
                                                <div className="task-dot progress"></div>
                                                <span>In Progress</span>
                                            </div>
                                            <span className="task-count">{inProgress}</span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill fill-progress" style={{width: `${this.getProgressWidth(inProgress, total)}%`}}></div>
                                        </div>
                                    </div>

                                    <div className="task-overview-item">
                                        <div className="task-label-row">
                                            <div className="task-label">
                                                <div className="task-dot done"></div>
                                                <span>Done</span>
                                            </div>
                                            <span className="task-count">{done}</span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill fill-done" style={{width: `${this.getProgressWidth(done, total)}%`}}></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Quick Actions</h3>
                            </div>
                            <div className="quick-actions">
                                <button className="quick-action-btn" onClick={() => this.navigateTo('/add-employee/_add')}>
                                    <div className="quick-action-icon" style={{background:'#e0e7ff'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="8.5" cy="7" r="4"></circle>
                                            <line x1="20" y1="8" x2="20" y2="14"></line>
                                            <line x1="23" y1="11" x2="17" y2="11"></line>
                                        </svg>
                                    </div>
                                    <span>Add Employee</span>
                                </button>
                                <button className="quick-action-btn" onClick={() => this.navigateTo('/employees')}>
                                    <div className="quick-action-icon" style={{background:'#dcfce7'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                    </div>
                                    <span>View Employees</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardComponent;
