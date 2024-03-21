import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from './Context/UserContext.js'
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import CartContextProvider from './Context/CartContext.js';
import WishListContextProvider from './Context/WishListContext.js';

let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WishListContextProvider>
        <CartContextProvider>
            <UserContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </UserContextProvider>
        </CartContextProvider>
    </WishListContextProvider>
);
