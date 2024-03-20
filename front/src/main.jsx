import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Home from "./routes/Home.jsx"
import Products from './routes/Products.jsx'
import Category from './routes/Category.jsx'
import History from './routes/History.jsx'

import { Provider } from 'react-redux';
import store from '/src/rdx/store';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/products",
        element: <Products />
      },
      {
        path:"/categories",
        element: <Category />
      },
      {
        path:"/history",
        element: <History />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)