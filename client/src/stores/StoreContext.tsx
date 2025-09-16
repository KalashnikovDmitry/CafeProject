import React, { createContext, useContext, ReactNode } from 'react';
import { RootStore } from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

interface StoreProviderProps {
  children: ReactNode;
  store: RootStore;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

// Convenience hooks for specific stores
export const useStaffStore = () => useStore().staffStore;
export const useAuthStore = () => useStore().authStore;
export const useNewsStore = () => useStore().newsStore;
export const useBookingStore = () => useStore().bookingStore;
export const useMenuStore = () => useStore().menuStore;
