import { makeAutoObservable } from 'mobx';
import { IMenu } from '../models/IMenu';
import { mockMenu } from '../data/mockData';

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
    this.loadMockData();
  }

  loadMockData() {
    this.menuItems = [...mockMenu];
  }

  async fetchMenuItems() {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.menuItems = [...mockMenu];
      this.isLoading = false;
      
      return this.menuItems;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createMenuItem(menuData: MenuData) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newItem: IMenu = {
        id: Math.max(...this.menuItems.map(item => item.id)) + 1,
        ...menuData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.menuItems.push(newItem);
      this.isLoading = false;
      
      return newItem;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateMenuItem(id: number, menuData: MenuData) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.menuItems.findIndex(item => item.id === id);
      if (index !== -1) {
        this.menuItems[index] = {
          ...this.menuItems[index],
          ...menuData,
          updatedAt: new Date()
        };
      }
      this.isLoading = false;
      
      return this.menuItems[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteMenuItem(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.menuItems = this.menuItems.filter(item => item.id !== id);
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
