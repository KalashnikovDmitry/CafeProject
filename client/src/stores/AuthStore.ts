import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { ILoginStaff } from '../models/ILoginStaff';
import { IStaff } from '../models/IStaff';

interface LoginData {
  email: string;
  password: string;
}

export class AuthStore {
  // Login state
  loginStaff: ILoginStaff = { email: '', password: '', token: '' };
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
  async login(loginData: LoginData) {
    try {
      this.isLoginLoading = true;
      this.loginError = '';
      
      const response = await axios.post<ILoginStaff>('http://localhost:5000/auth/login', loginData);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      
      this.loginStaff = response.data;
      this.isLoginLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
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
      
      const response = await axios.post<IStaff>('http://localhost:5000/auth/registration', staffData);
      this.registeredStaff = response.data;
      this.isRegistrationLoading = false;
      
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
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
    this.loginStaff = { email: '', password: '', token: '' };
    sessionStorage.removeItem('token');
  }

  get isAuthenticated() {
    return !!this.loginStaff.token;
  }
}
