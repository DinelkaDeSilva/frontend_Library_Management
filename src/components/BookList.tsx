import React from 'react';
import type { Book } from '../types/Book';
import { FaEdit, FaTrash, FaBook } from 'react-icons/fa';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <FaBook size={64} />
        <h3>No Books Found</h3>
        <p>Start by adding your first book to the library!</p>
      </div>
    );
  }

  
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-card-header">
            <h3>{book.title}</h3>
            <div className="book-card-actions">
              <button
                onClick={() => onEdit(book)}
                className="btn-icon btn-edit"
                title="Edit book"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="btn-icon btn-delete"
                title="Delete book"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="book-author">by {book.author}</p>
          <p className="book-description">{book.description}</p>
          <div className="book-meta">
            <small>Added: {new Date(book.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;