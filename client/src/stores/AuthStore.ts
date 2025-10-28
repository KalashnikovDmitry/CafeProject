import { makeAutoObservable } from 'mobx';
import { ILoginStaff, ILoginRequest } from '../models/ILoginStaff';
import { IStaff } from '../models/IStaff';
import { mockStaff } from '../data/mockData';

export class AuthStore {
  // Login state
  loginStaff: ILoginStaff = { token: '' };
  isLoginLoading: boolean = false;
  loginError: string = '';

  // Registration state
  registeredStaff: IStaff | null = null;
  isRegistrationLoading: boolean = false;
  registrationError: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // Login methods
  async login(loginData: ILoginRequest) {
    try {
      this.isLoginLoading = true;
      this.loginError = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем существование пользователя в моковых данных
      const staff = mockStaff.find(s => s.email === loginData.email);
      
      if (!staff) {
        throw new Error('Пользователь не найден');
      }
      
      // В реальном приложении здесь была бы проверка пароля
      const token = 'mock-jwt-token-' + Date.now();
      sessionStorage.setItem('token', token);
      
      this.loginStaff = { token };
      this.isLoginLoading = false;
      
      return this.loginStaff;
    } catch (e: unknown) {
      const error = e as { message?: string };
      const errorMessage = error.message || "An unknown error occurred";
      this.loginError = errorMessage;
      this.isLoginLoading = false;
      throw new Error(errorMessage);
    }
  }

  // Registration methods
  async register(staffData: IStaff) {
    try {
      this.isRegistrationLoading = true;
      this.registrationError = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем, что email не занят
      const existingStaff = mockStaff.find(s => s.email === staffData.email);
      if (existingStaff) {
        throw new Error('Пользователь с таким email уже существует');
      }
      
      // В реальном приложении здесь был бы вызов API
      this.registeredStaff = staffData;
      this.isRegistrationLoading = false;
      
      return staffData;
    } catch (e: unknown) {
      const error = e as { message?: string };
      const errorMessage = error.message || "An unknown error occurred";
      this.registrationError = errorMessage;
      this.isRegistrationLoading = false;
      throw new Error(errorMessage);
    }
  }

  // Utility methods
  clearLoginError() {
    this.loginError = '';
  }

  clearRegistrationError() {
    this.registrationError = '';
  }

  logout() {
    this.loginStaff = { token: '' };
    sessionStorage.removeItem('token');
  }

  get isAuthenticated() {
    return !!this.loginStaff.token;
  }
}
