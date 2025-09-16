import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { IMenu } from '../models/IMenu';

interface MenuData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

export class MenuStore {
  menuItems: IMenu[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMenuItems() {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get<IMenu[]>('http://localhost:5000/admin/menu', config);
      this.menuItems = response.data;
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createMenuItem(menuData: MenuData) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.post<IMenu>('http://localhost:5000/admin/menu', menuData, config);
      this.menuItems.push(response.data);
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateMenuItem(id: number, menuData: MenuData) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.put<IMenu>(`http://localhost:5000/admin/menu/${id}`, menuData, config);
      const index = this.menuItems.findIndex(item => item.id === id);
      if (index !== -1) {
        this.menuItems[index] = response.data;
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

  async deleteMenuItem(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`http://localhost:5000/admin/menu/${id}`, config);
      this.menuItems = this.menuItems.filter(item => item.id !== id);
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
