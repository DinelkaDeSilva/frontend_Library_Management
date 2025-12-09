import axios from 'axios';
import type { Book, CreateBookDto, UpdateBookDto } from '../types/Book';

const API_BASE_URL = 'http://localhost:5287/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>('/Books');
    return response.data;
  },

  
  getBookById: async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/Books/${id}`);
    return response.data;
  },

  
  createBook: async (book: CreateBookDto): Promise<Book> => {
    const response = await api.post<Book>('/Books', book);
    return response.data;
  },

  
  updateBook: async (id: number, book: UpdateBookDto): Promise<void> => {
    await api.put(`/Books/${id}`, book);
  },

  
  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/Books/${id}`);
  },
};