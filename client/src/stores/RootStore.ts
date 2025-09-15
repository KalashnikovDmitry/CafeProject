import { StaffStore } from './StaffStore';
import { AuthStore } from './AuthStore';
import { NewsStore } from './NewsStore';

export class RootStore {
  staffStore: StaffStore;
  authStore: AuthStore;
  newsStore: NewsStore;

  constructor() {
    this.staffStore = new StaffStore();
    this.authStore = new AuthStore();
    this.newsStore = new NewsStore();
  }
}

export const rootStore = new RootStore();
