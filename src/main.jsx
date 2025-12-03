import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux'
import store from './app/store.js';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  
    <QueryClientProvider client={queryClient}>
    <App />
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
