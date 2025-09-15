import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StoreProvider } from './stores/StoreContext'
import { rootStore } from './stores/RootStore'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <StoreProvider store={rootStore}>
        <App />
      </StoreProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
