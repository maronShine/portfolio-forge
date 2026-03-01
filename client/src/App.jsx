import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePortfolio from './pages/CreatePortfolio'
import Dashboard from './pages/Dashboard'
import ViewPortfolio from './pages/ViewPortfolio'
import EditPortfolio from './pages/EditPortfolio'

function App() {
  return (
    <Router>
      <div style={{minHeight: '100vh', backgroundColor: '#0A0F1E', color: '#FFFFFF'}}>
        <Navbar />
        <main style={{paddingTop: '4rem'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatePortfolio />} />
            <Route path="/portfolio/:id" element={<ViewPortfolio />} />
            <Route path="/edit/:id" element={<EditPortfolio />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
