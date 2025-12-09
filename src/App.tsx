import { useState, useEffect } from 'react';
import type { Book } from './types/Book';
import { bookService } from './services/bookService';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Modal from './components/Modal';
import { FaPlus, FaBook } from 'react-icons/fa';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend is running.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle create and update book
  const handleSubmit = async (data: {
    title: string;
    author: string;
    description: string;
  }) => {
    try {
      if (editingBook) {
        
        await bookService.updateBook(editingBook.id, {
          id: editingBook.id,
          ...data,
        });
      } else {
        
        await bookService.createBook(data);
      }
      fetchBooks();
      setIsModalOpen(false);
      setEditingBook(undefined);
    } catch (err) {
      alert('Failed to save book. Please try again.');
      console.error('Error saving book:', err);
    }
  };

  
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        fetchBooks();
      } catch (err) {
        alert('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      }
    }
  };

  
  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  
  const handleAddNew = () => {
    setEditingBook(undefined);
    setIsModalOpen(true);
  };

  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBook(undefined);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <FaBook size={32} />
            <h1>Library Management System</h1>
          </div>
          <button onClick={handleAddNew} className="btn btn-primary">
            <FaPlus /> Add Book
          </button>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        ) : error ? (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={fetchBooks} className="btn btn-primary">
              Retry
            </button>
          </div>
        ) : (
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
}

export default App;