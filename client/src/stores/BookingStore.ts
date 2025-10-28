import { makeAutoObservable } from 'mobx';
import { IBooking } from '../models/IBooking';
import { mockBookings } from '../data/mockData';

export class BookingStore {
  bookings: IBooking[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadMockData();
  }

  loadMockData() {
    this.bookings = [...mockBookings];
  }

  async fetchBookings() {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.bookings = [...mockBookings];
      this.isLoading = false;
      
      return this.bookings;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createBooking(bookingData: Omit<IBooking, 'id'>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newBooking: IBooking = {
        id: Math.max(...this.bookings.map(item => item.id)) + 1,
        ...bookingData
      };
      
      this.bookings.push(newBooking);
      this.isLoading = false;
      
      return newBooking;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateBooking(id: number, bookingData: Partial<IBooking>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.bookings.findIndex(booking => booking.id === id);
      if (index !== -1) {
        this.bookings[index] = {
          ...this.bookings[index],
          ...bookingData
        };
      }
      this.isLoading = false;
      
      return this.bookings[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteBooking(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.bookings = this.bookings.filter(booking => booking.id !== id);
      this.isLoading = false;
      
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async getAvailableTables(date: string, time: string) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Фильтруем забронированные столы на указанную дату и время
      const bookedTableNumbers = this.bookings
        .filter(booking => 
          booking.date.toISOString().split('T')[0] === date && 
          booking.time === time
        )
        .map(booking => booking.tableNumber);
      
      // Возвращаем доступные столы (все столы кроме забронированных)
      const availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .filter(tableNumber => !bookedTableNumbers.includes(tableNumber))
        .map(tableNumber => ({
          number: tableNumber,
          capacity: Math.floor(Math.random() * 6) + 2, // 2-8 мест
          floor: Math.floor(Math.random() * 2) + 1, // 1-2 этаж
          section: ['VIP', 'Основной зал', 'Терраса'][Math.floor(Math.random() * 3)]
        }));
      
      this.isLoading = false;
      return availableTables;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async getBookingsByDate(date: string) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const bookingsForDate = this.bookings.filter(booking => 
        booking.date.toISOString().split('T')[0] === date
      );
      
      this.isLoading = false;
      return bookingsForDate;
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
