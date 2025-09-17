import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './ui/RootLayout.jsx'
import HomePage from './ui/pages/HomePage.jsx'
import ShopPage from './ui/pages/ShopPage.jsx'
import CartPage from './ui/pages/CartPage.jsx'
import AboutPage from './ui/pages/AboutPage.jsx'
import ContactPage from './ui/pages/ContactPage.jsx'
import AccountPage from './ui/pages/AccountPage.jsx'

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [
    { index: true, element: <HomePage /> },
    { path: 'shop', element: <ShopPage /> },
    { path: 'cart', element: <CartPage /> },
    { path: 'about', element: <AboutPage /> },
    { path: 'contact', element: <ContactPage /> },
    { path: 'account', element: <AccountPage /> },
  ]}
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


