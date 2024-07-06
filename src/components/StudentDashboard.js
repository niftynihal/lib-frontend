import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function StudentDashboard() {
    const [books, setBooks] = useState([]);
    const [rentals, setRentals] = useState([]);
    const { user } = useAuth();
  
    useEffect(() => {
      fetchBooks();
      fetchRentals();
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
  
    const fetchRentals = async () => {
      try {
        const response = await axios.get('https://lib-backend-b0cd.onrender.com/api/rentals', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setRentals(response.data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        alert('Error fetching rentals. Please try again.');
      }
    };
  
    const handleRent = async (bookId) => {
      try {
        await axios.post('https://lib-backend-b0cd.onrender.com/api/rentals', 
          { bookId, returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }, // 14 days from now
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        alert('Book rented successfully!');
        fetchBooks();
        fetchRentals();
      } catch (error) {
        console.error('Error renting book:', error);
        alert('Error renting book. Please try again.');
      }
    };
  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Student Dashboard - Available Books</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                  <button 
                    onClick={() => handleRent(book._id)} 
                    disabled={book.quantity === 0}
                    style={styles.rentButton}
                  >
                    {book.quantity > 0 ? 'Rent' : 'Not Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h2 style={styles.subtitle}>Your Rentals</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Rented On</th>
              <th>Return By</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.book.title}</td>
                <td>{new Date(rental.rentedAt).toLocaleDateString()}</td>
                <td>{new Date(rental.returnDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#333',
    marginTop: '40px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  rentButton: {
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;