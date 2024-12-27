import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'
import '../src/styles/app.css'

import SignInCard from './components/user/SignInCard'
import SignUpCard from './components/user/SignUpCard'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignInCard />} />
          <Route path='/sign-up' element={<SignUpCard />} />
          <Route
            path='/dashboard'
            element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path='/*' element={<Navigate to="/sign-in" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
