import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://lib-backend-b0cd.onrender.com/api/books', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error fetching books. Please try again.');
    }
  };

  const handleAddBook = () => {
    navigate('/add-book');
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://lib-backend-b0cd.onrender.com/api/books/${editingBook._id}`, editingBook, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEditingBook(null);
      fetchBooks();
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error updating book. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`https://lib-backend-b0cd.onrender.com/api/books/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchBooks();
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard - All Books</h1>
      <button onClick={handleAddBook} style={styles.addButton}>ADD BOOK</button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Publisher</th>
            <th>Publication Year</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.category}</td>
              <td>{book.publisher}</td>
              <td>{book.publicationYear}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => handleEdit(book)} style={styles.actionButton}>Edit</button>
                <button onClick={() => handleDelete(book._id)} style={styles.actionButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingBook && (
        <div style={styles.modal}>
          <form onSubmit={handleUpdate} style={styles.form}>
          <input
              type="text"
              name="title"
              value={editingBook.title}
              onChange={handleInputChange}
              placeholder="Title"
              style={styles.input}
            />
            <input
              type="text"
              name="author"
              value={editingBook.author}
              onChange={handleInputChange}
              placeholder="Author"
              style={styles.input}
            />
            <input
              type="text"
              name="isbn"
              value={editingBook.isbn}
              onChange={handleInputChange}
              placeholder="ISBN"
              style={styles.input}
            />
           
            <input
              type="text"
              name="publicationYear"
              value={editingBook.publicationYear}
              onChange={handleInputChange}
              placeholder="Publication Year"
              style={styles.input}
            />
            <input
              type="number"
              name="quantity"
              value={editingBook.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>Update</button>
            <button onClick={() => setEditingBook(null)} style={styles.cancelButton}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}


const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '8px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  actionButton: {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;