import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import AddBook from './components/AddBook';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './AuthContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              {user && user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/student" />}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              {user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/student" />}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student" 
          element={
            <ProtectedRoute>
              {user && user.role === 'student' ? <StudentDashboard /> : <Navigate to="/admin" />}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-book" 
          element={
            <ProtectedRoute>
              {user && user.role === 'admin' ? <AddBook /> : <Navigate to="/student" />}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default AppContent;