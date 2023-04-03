import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import {Navbar,Contact,Footer,Addyours} from '/components/'
// import {Navbar,Contact,Footer,Addyours} from '/components/'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Addyours from './components/Addyours'
import Contact from './components/Contact'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import CusCards from './components/Cards/CusCards'
import View from './components/View'
import List from './components/List/List'

function App() {
  
  return (
    <Routes>
      <Route path='/home' element={<><Navbar path="/home"/><CusCards/><Footer/></>}/>
      <Route path='/add-yours' element={<><Navbar path="/add-yours"/><Addyours/><Footer/></>}/>
      <Route path='/view-page/:id' element={<><Navbar path="/add-yours"/><View/> <Footer/></>}/>
      <Route path='/edit/:id' element={<><Navbar path="/edit"/><Addyours/><Footer/></>}/>
      <Route path='/product' element={<><Navbar path="/product"/><List/> <Footer/></>}/>
      <Route path='/auth/login' element={<><Navbar/><Login/><Footer/></>}/>
      <Route path='/auth/signup' element={<><Navbar/><Signup/><Footer/></>}/>
    </Routes>
  )
}

export default App
