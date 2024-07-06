import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lib-backend-b0cd.onrender.com/api/auth/login', credentials);
      login(response.data.token, { role: response.data.role });
      
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Back!</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email address"
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.loginButton}>Login</button>
      </form>
      <p style={styles.registerText}>
        New User? <Link to="/register" style={styles.registerLink}>Register here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: '50px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  loginButton: {
    backgroundColor: '#ffa000',
    color: 'white',
    border: 'none',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px',
  },
  registerText: {
    marginTop: '20px',
  },
  registerLink: {
    color: '#ffa000',
    textDecoration: 'none',
  },
};

export default Login;