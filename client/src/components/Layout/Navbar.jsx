import { useState } from 'react'
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
        * {
          box-sizing: border-box;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
          background-color: #1A4D8F;
          z-index: 1000;
        }

        .navbar-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4rem;
          box-sizing: border-box;
        }

        .navbar-logo {
          text-decoration: none;
          flex-shrink: 0;
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

        /* ── Desktop nav ── */
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
          transition: color 0.2s;
        }

        .navbar-link:hover,
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
          transition: background 0.2s, color 0.2s;
        }

        .navbar-btn-connexion:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
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
          transition: background 0.2s;
        }

        .navbar-btn-inscription:hover {
          background: #00b395;
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
          transition: background 0.2s;
        }

        .navbar-btn-dashboard:hover {
          background: #00b395;
        }

        .navbar-btn-logout {
          padding: 0.5rem 1rem;
          background: #EF4444;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .navbar-btn-logout:hover {
          background: #dc2626;
        }

        /* ── Hamburger button ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-shrink: 0;
          z-index: 1001;
        }

        .hamburger-bar {
          width: 25px;
          height: 3px;
          background: #FFFFFF;
          border-radius: 2px;
          display: block;
          transition: all 0.3s ease;
        }

        /* Animate hamburger → X when open */
        .hamburger.open .hamburger-bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger.open .hamburger-bar:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open .hamburger-bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* ── Mobile menu ── */
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #1A2332;
          padding: 0.5rem 1rem 1rem;
          border-top: 1px solid #334155;
          width: 100%;
          box-sizing: border-box;
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
          transition: color 0.2s;
        }

        .mobile-link:hover {
          color: #fff;
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
          transition: color 0.2s;
        }

        .mobile-btn:hover {
          color: #fff;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 1024px) {
          .navbar-desktop {
            display: none !important;
          }

          .hamburger {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-logo-title {
            font-size: 1rem;
          }

          .navbar-logo-sub {
            font-size: 0.6rem;
          }

          .navbar-inner {
            padding: 0 0.75rem;
          }
        }

        @media (min-width: 481px) and (max-width: 1024px) {
          .navbar-logo-title {
            font-size: 1.2rem;
          }

          .navbar-logo-sub {
            font-size: 0.7rem;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-title">PortfolioForge</div>
            <div className="navbar-logo-sub">Emmanuel Bagi</div>
          </Link>

          {/* Desktop links */}
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
                <span style={{ color: '#E0E7FF', fontSize: '0.875rem' }}>
                  {user.firstName}
                </span>
                <Link to="/dashboard" className="navbar-btn-dashboard">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="navbar-btn-logout">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-btn-connexion">Connexion</Link>
                <Link to="/register" className="navbar-btn-inscription">Inscription</Link>
              </>
            )}
          </div>

          {/* Hamburger button */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>

        </div>

        {/* Mobile menu */}
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
              <Link
                to="/dashboard"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button className="mobile-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
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
