import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { IBooking } from '../models/IBooking';

export class BookingStore {
  bookings: IBooking[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBookings() {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get<IBooking[]>('http://localhost:5000/admin/bookings', config);
      this.bookings = response.data;
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createBooking(bookingData: Omit<IBooking, 'id'>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.post<IBooking>('http://localhost:5000/admin/bookings', bookingData, config);
      this.bookings.push(response.data);
      this.isLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateBooking(id: number, bookingData: Partial<IBooking>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.put<IBooking>(`http://localhost:5000/admin/bookings/${id}`, bookingData, config);
      const index = this.bookings.findIndex(booking => booking.id === id);
      if (index !== -1) {
        this.bookings[index] = response.data;
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

  async deleteBooking(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`http://localhost:5000/admin/bookings/${id}`, config);
      this.bookings = this.bookings.filter(booking => booking.id !== id);
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
