import React, { useState, useEffect } from 'react';
import type { Book } from '../types/Book';

interface BookFormProps {
  book?: Book;
  onSubmit: (data: { title: string; author: string; description: string }) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const newErrors = { title: '', author: '', description: '' };
    
    // Validate title
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }
    
    // Validate author
    if (!author.trim()) {
      newErrors.author = 'Author is required';
    } else if (author.trim().length < 2) {
      newErrors.author = 'Author must be at least 2 characters';
    }

    // Validate description
    if (description.trim().length > 0 && description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters if provided';
    }
    
    
    
    setErrors(newErrors);
    
    // If no errors,submit
    if (!newErrors.title && !newErrors.author && !newErrors.description) {
      onSubmit({ title, author, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="Enter book title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={200}
          placeholder="Enter author name"
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Enter book description"
        />
         {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;