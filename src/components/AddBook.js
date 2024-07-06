import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    quantity: 1,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lib-backend-b0cd.onrender.com/api/books', book, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Book added successfully!');
      navigate('/');  // Redirect to dashboard after adding book
    } catch (error) {
      console.error('Error adding book:', error.response?.data?.message || error.message);
      alert('Error adding book. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author Name"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="publicationYear"
          value={book.publicationYear}
          onChange={handleChange}
          placeholder="Publication Year"
          style={styles.input}
          required
        />
        <input
          type="number"
          name="quantity"
          value={book.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton}>Add Book</button>
      </form>
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
  submitButton: {
    backgroundColor: '#ffa000',
    color: 'white',
    border: 'none',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px',
  },
};

export default AddBook;