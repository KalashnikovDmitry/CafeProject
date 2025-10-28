import { makeAutoObservable } from 'mobx';
import { INews } from '../models/INews';
import { mockNews, mockStaff } from '../data/mockData';

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
    this.loadMockData();
  }

  loadMockData() {
    this.news = [...mockNews];
    this.newsList = [...mockNews];
  }

  // Get news list methods
  async fetchNews() {
    try {
      this.isGetNewsLoading = true;
      this.getNewsError = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.newsList = [...mockNews];
      this.news = [...mockNews];
      this.isGetNewsLoading = false;
      
      return this.newsList;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.getNewsError = errorMessage;
      this.isGetNewsLoading = false;
      throw new Error(errorMessage);
    }
  }

  async fetchAdminNews() {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.news = [...mockNews];
      this.isLoading = false;
      
      return this.news;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
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
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newNews: INews = {
        id: Math.max(...this.news.map(item => item.id)) + 1,
        ...newsData,
        staffId: 1, // Администратор по умолчанию
        author: mockStaff[0]
      };
      
      this.postedNews = newNews;
      this.newsList.unshift(newNews);
      this.news.unshift(newNews);
      this.isPostNewsLoading = false;
      
      return newNews;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
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
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.news.findIndex(news => news.id === id);
      if (index !== -1) {
        this.news[index] = {
          ...this.news[index],
          ...newsData
        };
      }
      this.isLoading = false;
      
      return this.news[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteNews(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.news = this.news.filter(news => news.id !== id);
      this.newsList = this.newsList.filter(news => news.id !== id);
      this.isLoading = false;
      
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  clearError() {
    this.error = '';
  }
}
