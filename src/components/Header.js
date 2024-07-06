import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>eLibrary</div>
      <nav>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin" style={styles.navItem}>DASHBOARD</Link>
                <Link to="/add-book" style={styles.navItem}>ADD BOOK</Link>
              </>
            ) : (
              <Link to="/student" style={styles.navItem}>DASHBOARD</Link>
            )}
            <button onClick={handleLogout} style={styles.logoutButton}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navItem}>LOGIN</Link>
            <Link to="/register" style={styles.navItem}>REGISTER</Link>
          </>
        )}
      </nav>
    </header>
  );
}


const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#b71c1c',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  },
};

export default Header;