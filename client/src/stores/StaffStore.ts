import { makeAutoObservable } from 'mobx';
import { IStaff } from '../models/IStaff';
import { mockStaff } from '../data/mockData';

export class StaffStore {
  staffs: IStaff[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadMockData();
  }

  loadMockData() {
    this.staffs = [...mockStaff];
  }

  async fetchStaffs() {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.staffs = [...mockStaff];
      this.isLoading = false;
      
      return this.staffs;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createStaff(staffData: IStaff) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newStaff: IStaff = {
        id: Math.max(...this.staffs.map(item => item.id)) + 1,
        ...staffData
      };
      
      this.staffs.push(newStaff);
      this.isLoading = false;
      
      return newStaff;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateStaff(id: number, staffData: IStaff) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.staffs.findIndex(staff => staff.id === id);
      if (index !== -1) {
        this.staffs[index] = {
          ...this.staffs[index],
          ...staffData
        };
      }
      this.isLoading = false;
      
      return this.staffs[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteStaff(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.staffs = this.staffs.filter(staff => staff.id !== id);
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
