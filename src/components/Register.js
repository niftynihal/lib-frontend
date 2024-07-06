import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await axios.post('https://lib-backend-b0cd.onrender.com/api/users/register', user);
      alert('Registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome!</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="User Name"
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email address"
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          style={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          style={styles.input}
          required
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.registerButton}>Register</button>
      </form>
      <p>Already registered? <span onClick={() => navigate('/login')} style={styles.loginLink}>Login here</span>.</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
  },
  registerButton: {
    backgroundColor: '#ffa000',
    color: 'white',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  loginLink: {
    color: '#ffa000',
    cursor: 'pointer',
  },
};

export default Register;