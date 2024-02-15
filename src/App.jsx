import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
// import {Navbar,Contact,Footer,Addyours} from '/components/'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import CusCards from './components/Cards/CusCards';
import ProtectedRoute from './ProtectedRoute';
import Product from './components/Product';
import Wishlist from './components/List/Wishlist';
import Cart from './components/Cart';
import { useDispatch } from 'react-redux';
import { productData, userActions } from './store/userSlice';

let initial = true
function App () {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
      if(initial){
        setLoading(true)
        dispatch(userActions.checkData())
        dispatch(productData())
        setLoading(false)
        initial = false
      }
    },[])

  if (loading) {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
  }

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
        path="/cart"
        element={
          <ProtectedRoute>
            <Navbar path="/cart" /><Cart /> <Footer />
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
