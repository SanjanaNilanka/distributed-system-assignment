import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../components/home/LandingPage'
import AppAppBar from '../components/appbar/AppAppBar'
import Footer from '../components/footer/Footer'

export default function CommonStack({ toggleTheme }) {
  return (
    <div>
      <header>
        <AppAppBar toggleColorMode={toggleTheme}/>
      </header>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
      
      <footer>
        <Footer/>
      </footer>
    </div>
    
  )
}
