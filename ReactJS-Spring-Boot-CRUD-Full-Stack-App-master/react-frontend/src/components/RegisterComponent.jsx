import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './RegisterComponent.css';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        };
    }

    register = (e) => {
        e.preventDefault();

        const { fullName, email, username, password, confirmPassword } = this.state;

        if (!fullName || !email || !username || !password || !confirmPassword) {
            this.setState({ errorMessage: 'Please fill in all registration fields.' });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({ errorMessage: 'Passwords do not match.' });
            return;
        }

        const newUser = {
            fullName,
            email,
            username,
            password,
        };

        this.setState({ errorMessage: '' });

        AuthService.register(newUser).then(() => {
            this.props.history.push('/login', { registered: true });
        }).catch((error) => {
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Registration failed. Please make sure the backend is running!';
            this.setState({ errorMessage: message });
        });
    }

    render() {
        return (
            <div className="register-wrapper">
                <div className="register-bg">
                    <div className="register-orb orb-1"></div>
                    <div className="register-orb orb-2"></div>
                    <div className="register-orb orb-3"></div>
                </div>

                <div className="register-card">
                    <div className="register-header">
                        <h2>Create Account</h2>
                        <p>Register a new account to continue</p>
                    </div>

                    {this.state.errorMessage && (
                        <div className="register-error">{this.state.errorMessage}</div>
                    )}

                    <form className="register-form" onSubmit={this.register}>
                        <div className="register-grid">
                            <div className="register-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter your full name" value={this.state.fullName} onChange={(e) => this.setState({ fullName: e.target.value })} />
                            </div>
                            <div className="register-group">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="register-group">
                                <label>Username</label>
                                <input type="text" placeholder="Choose a username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </div>
                            <div className="register-group">
                                <label>Password</label>
                                <input type="password" placeholder="Create a password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <div className="register-group register-full">
                                <label>Confirm Password</label>
                                <input type="password" placeholder="Re-enter your password" value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                            </div>
                        </div>

                        <button type="submit" className="register-btn">Register</button>
                    </form>

                    <div className="register-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;