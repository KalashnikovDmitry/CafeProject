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
  newsList: INews[] = [];
  isGetNewsLoading: boolean = false;
  getNewsError: string = '';

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
      this.isGetNewsLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.getNewsError = errorMessage;
      this.isGetNewsLoading = false;
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
}
