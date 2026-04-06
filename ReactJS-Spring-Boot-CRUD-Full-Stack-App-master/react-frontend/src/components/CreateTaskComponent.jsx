import React, { Component } from 'react';
import TaskService from '../services/TaskService';
import './CreateTaskComponent.css';

class CreateTaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: this.props.match.params.taskId,
            employeeId: this.props.match.params.id,
            title: '',
            description: '',
            status: 'TODO',
            dueDate: '',
            errorMessage: ''
        };
    }

    componentDidMount() {
        if (this.state.taskId !== '_add') {
            TaskService.getTaskById(this.state.taskId).then(res => {
                const task = res.data;
                this.setState({
                    title: task.title,
                    description: task.description || '',
                    status: task.status,
                    dueDate: task.dueDate || ''
                });
            }).catch(() => {
                this.setState({ errorMessage: 'Could not load task details.' });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { taskId, employeeId, title, description, status, dueDate } = this.state;

        if (!title.trim()) {
            this.setState({ errorMessage: 'Task title is required.' });
            return;
        }

        const task = { title, description, status, dueDate };
        this.setState({ errorMessage: '' });

        if (taskId === '_add') {
            TaskService.createTask(employeeId, task).then(() => {
                this.props.history.push(`/employees/${employeeId}/tasks`);
            }).catch(err => {
                this.setState({ errorMessage: 'Failed to create task. Make sure the backend is running! Error: ' + err.message });
            });
        } else {
            TaskService.updateTask(taskId, task).then(() => {
                this.props.history.push(`/employees/${employeeId}/tasks`);
            }).catch(err => {
                this.setState({ errorMessage: 'Failed to update task. Error: ' + err.message });
            });
        }
    }

    cancel = () => {
        this.props.history.push(`/employees/${this.state.employeeId}/tasks`);
    }

    render() {
        const { taskId, title, description, status, dueDate, errorMessage } = this.state;
        const isEdit = taskId !== '_add';

        return (
            <div className="task-form-container">
                <div className="task-form-header">
                    <h3>{isEdit ? 'Edit Task' : 'Add New Task'}</h3>
                </div>

                {errorMessage && (
                    <div className="task-error-banner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={this.handleSubmit}>
                    <div className="task-form-group">
                        <label>Task Title *</label>
                        <input
                            type="text"
                            className="task-input"
                            placeholder="e.g. Prepare monthly report"
                            value={title}
                            onChange={e => this.setState({ title: e.target.value })}
                        />
                    </div>

                    <div className="task-form-group">
                        <label>Description</label>
                        <textarea
                            className="task-input"
                            placeholder="Add optional details about this task..."
                            value={description}
                            onChange={e => this.setState({ description: e.target.value })}
                        />
                    </div>

                    <div className="task-form-group">
                        <label>Status</label>
                        <select
                            className="task-input"
                            value={status}
                            onChange={e => this.setState({ status: e.target.value })}
                        >
                            <option value="TODO">📋 To Do</option>
                            <option value="IN_PROGRESS">⏳ In Progress</option>
                            <option value="DONE">✅ Done</option>
                        </select>
                    </div>

                    <div className="task-form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            className="task-input"
                            value={dueDate}
                            onChange={e => this.setState({ dueDate: e.target.value })}
                        />
                    </div>

                    <div className="task-form-actions">
                        <button type="button" className="btn-task-cancel" onClick={this.cancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-task-save">
                            {isEdit ? 'Update Task' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateTaskComponent;
