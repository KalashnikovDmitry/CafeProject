import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { INews } from '../models/INews';

interface NewsData {
  title: string;
  content: string;
  image: string;
}

export class NewsStore {
  // Get news list state
  news: INews[] = [];
  newsList: INews[] = [];
  isLoading: boolean = false;
  isGetNewsLoading: boolean = false;
  getNewsError: string = '';
  error: string = '';

  // Post news state
  postedNews: INews | null = null;
  isPostNewsLoading: boolean = false;
  postNewsError: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // Get news list methods
  async fetchNews() {
    try {
      this.isGetNewsLoading = true;
      this.getNewsError = '';
      
      const response = await axios.get<INews[]>('http://localhost:5000/news');
      this.newsList = response.data;
      this.news = response.data;
      this.isGetNewsLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.getNewsError = errorMessage;
      this.isGetNewsLoading = false;
      throw new Error(errorMessage);
    }
  }

  async fetchAdminNews() {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get<INews[]>('http://localhost:5000/admin/news', config);
      this.news = response.data;
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  // Post news methods
  async postNews(newsData: NewsData) {
    try {
      this.isPostNewsLoading = true;
      this.postNewsError = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.post<INews>('http://localhost:5000/news', newsData, config);
      this.postedNews = response.data;
      this.isPostNewsLoading = false;
      
      // Add to news list
      this.newsList.unshift(response.data);
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.postNewsError = errorMessage;
      this.isPostNewsLoading = false;
      throw new Error(errorMessage);
    }
  }

  // Utility methods
  clearGetNewsError() {
    this.getNewsError = '';
  }

  clearPostNewsError() {
    this.postNewsError = '';
  }

  clearPostedNews() {
    this.postedNews = null;
  }

  async updateNews(id: number, newsData: NewsData) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.put<INews>(`http://localhost:5000/admin/news/${id}`, newsData, config);
      const index = this.news.findIndex(news => news.id === id);
      if (index !== -1) {
        this.news[index] = response.data;
      }
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteNews(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`http://localhost:5000/admin/news/${id}`, config);
      this.news = this.news.filter(news => news.id !== id);
      this.isLoading = false;
      
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  clearError() {
    this.error = '';
  }
}
