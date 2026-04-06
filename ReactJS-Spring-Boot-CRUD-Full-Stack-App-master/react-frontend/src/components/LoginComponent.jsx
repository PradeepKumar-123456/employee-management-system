import React, { Component } from 'react';
import './LoginComponent.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isFocused: false
        }
    }

    login = (e) => {
        e.preventDefault();
        // Skip actual authentication logic for display purposes,
        // simply navigate to the main application index on submission.
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className="login-wrapper">
                {/* Premium Background Shapes */}
                <div className="bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="login-container">
                    <div className="glass-panel">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to Employee Management System</p>
                        </div>
                        
                        <form className="login-form" onSubmit={this.login}>
                            <div className="input-group">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({username: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({password: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="actions">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>

                            <button type="submit" className="login-btn">
                                Sign In
                            </button>
                        </form>

                        <div className="signup-link">
                            Don't have an account? <a href="#">Create one</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
