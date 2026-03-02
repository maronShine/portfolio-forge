import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const isAuthenticated = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Créer Portfolio', href: '/create' },
  ]

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: #1A4D8F;
          z-index: 1000;
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4rem;
        }
        .navbar-logo {
          text-decoration: none;
        }
        .navbar-logo-title {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1;
        }
        .navbar-logo-sub {
          font-size: 0.85rem;
          color: #E0E7FF;
          font-family: Georgia, serif;
          line-height: 1;
          margin-top: 2px;
        }
        .navbar-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .navbar-link {
          color: #E0E7FF;
          font-family: Georgia, serif;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
        }
        .navbar-link.active {
          color: #FFFFFF;
        }
        .navbar-btn-connexion {
          padding: 0.5rem 1rem;
          background: transparent;
          color: #E0E7FF;
          border: 1px solid #E0E7FF;
          border-radius: 0.5rem;
          text-decoration: none;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .navbar-btn-inscription {
          padding: 0.5rem 1rem;
          background: #00C9A7;
          color: white;
          border: none;
          border-radius: 0.5rem;
          text-decoration: none;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .navbar-btn-dashboard {
          padding: 0.5rem 1rem;
          background: #00C9A7;
          color: white;
          border: none;
          border-radius: 0.5rem;
          text-decoration: none;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .navbar-btn-logout {
          padding: 0.5rem 1rem;
          background: #EF4444;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .hamburger-bar {
          width: 25px;
          height: 3px;
          background: #FFFFFF;
          border-radius: 2px;
          display: block;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #1A2332;
          padding: 1rem;
          border-top: 1px solid #334155;
        }
        .mobile-menu.open {
          display: flex;
        }
        .mobile-link {
          color: #94A3B8;
          font-weight: 500;
          padding: 1rem 0;
          border-bottom: 1px solid #334155;
          text-decoration: none;
          display: block;
        }
        .mobile-btn {
          color: #94A3B8;
          font-weight: 500;
          padding: 1rem 0;
          background: none;
          border: none;
          border-bottom: 1px solid #334155;
          text-align: left;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
        }
        @media (max-width: 768px) {
          .navbar-desktop {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-title">PortfolioForge</div>
            <div className="navbar-logo-sub">Emmanuel Bagi</div>
          </Link>

          {/* Desktop */}
          <div className="navbar-desktop">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`navbar-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <span style={{ color: '#E0E7FF', fontSize: '0.875rem' }}>{user.firstName}</span>
                <Link to="/dashboard" className="navbar-btn-dashboard">Dashboard</Link>
                <button onClick={handleLogout} className="navbar-btn-logout">Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-btn-connexion">Connexion</Link>
                <Link to="/register" className="navbar-btn-inscription">Inscription</Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button className="mobile-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
              <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
