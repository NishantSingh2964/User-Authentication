import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";
import BlogProvider from './Context/blogContext.jsx';
import CommentContextProvider from './Context/CommentContext.jsx';
import { BookProvider } from './Context/BookContext.jsx';
import { OrderProvider } from './Context/OrderContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <BlogProvider>
        <CommentContextProvider>
          <BookProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </BookProvider>
        </CommentContextProvider>
      </BlogProvider>
    </BrowserRouter>
  </AuthProvider>
)
