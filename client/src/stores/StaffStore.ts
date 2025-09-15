import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { IStaff } from '../models/IStaff';

export class StaffStore {
  staffs: IStaff[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStaffs() {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get<IStaff[]>('http://localhost:5000/admin/staffs', config);
      this.staffs = response.data;
      this.isLoading = false;
      
      return response.data;
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
