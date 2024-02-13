import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
// import {Navbar,Contact,Footer,Addyours} from '/components/'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CusCards from './components/Cards/CusCards';
import View from './components/View';
import List from './components/List/List';
import ProtectedRoute from './ProtectedRoute';
import Product from './components/Product';
import Wishlist from './components/List/Wishlist';

function App () {
  return (
    <Routes>
      <Route
        path="/view-page/:id"
        element={<ProtectedRoute><Navbar /><Product /> <Footer /></ProtectedRoute>}
      />
      {/* <Route path='/edit/:id' element={<><Navbar path="/edit"/><Addyours/><Footer/></>}/> */}
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Navbar path="/wishlist" /><Wishlist /> <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/login"
        element={<><Navbar /><Login /><Footer /></>}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navbar path="/" /><CusCards /><Footer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
