import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogPage from './pages/BlogPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import CustomerPage from './pages/CustomerPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <HomePage />
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/category" element={<CategoryPage />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/customer" element={<CustomerPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App