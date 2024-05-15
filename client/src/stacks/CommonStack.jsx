import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../components/home/LandingPage'
import AppAppBar from '../components/appbar/AppAppBar'
import Footer from '../components/footer/Footer'
import Payment from '../components/payments/Payment';
import PaymentSuccess from '../components/payments/PaymentSuccess';
import GetPayment from '../components/payments/GetPayment'
import EnrolledCourses from '../components/learner/enrolled-courses'
import CoursePage from '../components/learner/coursePages'

export default function CommonStack({ toggleTheme }) {
  return (
    <div>
      <header>
        <AppAppBar toggleColorMode={toggleTheme}/>
      </header>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/payments" element={<Payment/>} />
        <Route path="/paymentSuccess" element={<PaymentSuccess/>} />
        <Route path="/getPayment/:transactionId" element={<GetPayment />} />
        <Route path="enrolled-courses" element={<EnrolledCourses />} />
        <Route path="courses/:courseId" element={<CoursePage />} />
      </Routes>
      
      <footer>
        <Footer/>
      </footer>
    </div>
    
  )
}
