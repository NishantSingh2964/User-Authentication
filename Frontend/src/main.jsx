import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";
import BlogProvider from './Context/blogContext.jsx';
import { CommentProvider } from "./Context/CommentContext.jsx";
import { BookProvider } from './Context/BookContext.jsx';
import { OrderProvider } from './Context/OrderContext.jsx';
import { FavoriteContext, FavoriteProvider } from './Context/favouriteContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <BlogProvider>
        <CommentProvider>
          <BookProvider>
            <FavoriteProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </FavoriteProvider>
          </BookProvider>
        </CommentProvider>
      </BlogProvider>
    </BrowserRouter>
  </AuthProvider>
)
