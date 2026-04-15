import React, { Component } from 'react';
import './LoginComponent.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isFocused: false,
            successMessage: ''
        }
        this.goToCreateAccount = this.goToCreateAccount.bind(this);
    }

    goToCreateAccount() {
        this.props.history.push('/register');
    }

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state && location.state.registered) {
            this.setState({ successMessage: 'Registration completed. Please sign in.' });
            this.props.history.replace({ pathname: '/login', state: {} });
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
                        {this.state.successMessage && (
                            <div className="error-banner" style={{ marginBottom: '18px', background: 'rgba(34, 197, 94, 0.12)', borderColor: 'rgba(34, 197, 94, 0.35)', color: '#bbf7d0' }}>
                                {this.state.successMessage}
                            </div>
                        )}
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
                                <button type="button" className="forgot-password">Forgot Password?</button>
                            </div>

                            <button type="submit" className="login-btn">
                                Sign In
                            </button>
                        </form>

                        <div className="signup-link">
                            Don't have an account? <button type="button" className="signup-button" onClick={this.goToCreateAccount}>Create one</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
