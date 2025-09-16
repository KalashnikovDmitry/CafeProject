import { StaffStore } from './StaffStore';
import { AuthStore } from './AuthStore';
import { NewsStore } from './NewsStore';
import { BookingStore } from './BookingStore';
import { MenuStore } from './MenuStore';

export class RootStore {
  staffStore: StaffStore;
  authStore: AuthStore;
  newsStore: NewsStore;
  bookingStore: BookingStore;
  menuStore: MenuStore;

  constructor() {
    this.staffStore = new StaffStore();
    this.authStore = new AuthStore();
    this.newsStore = new NewsStore();
    this.bookingStore = new BookingStore();
    this.menuStore = new MenuStore();
  }
}

export const rootStore = new RootStore();
