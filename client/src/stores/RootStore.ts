import { StaffStore } from './StaffStore';
import { AuthStore } from './AuthStore';
import { NewsStore } from './NewsStore';
import { BookingStore } from './BookingStore';
import { MenuStore } from './MenuStore';
import { TableStore } from './TableStore';

export class RootStore {
  staffStore: StaffStore;
  authStore: AuthStore;
  newsStore: NewsStore;
  bookingStore: BookingStore;
  menuStore: MenuStore;
  tableStore: TableStore;

  constructor() {
    this.staffStore = new StaffStore();
    this.authStore = new AuthStore();
    this.newsStore = new NewsStore();
    this.bookingStore = new BookingStore();
    this.menuStore = new MenuStore();
    this.tableStore = new TableStore();
  }
}

export const rootStore = new RootStore();
