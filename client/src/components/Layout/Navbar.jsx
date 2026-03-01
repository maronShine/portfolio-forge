import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Créer Portfolio', href: '/create' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const isAuthenticated = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: scrolled ? 'rgba(26, 35, 50, 0.98)' : 'rgba(26, 35, 50, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #334155',
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontFamily: "Syne, sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#FFFFFF',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: '#00C9A7',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{color: 'white', fontWeight: 'bold', fontFamily: "Syne, sans-serif"}}>PF</span>
            </div>
            <span>PortfolioForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  color: location.pathname === item.href ? '#00C9A7' : '#94A3B8',
                  fontWeight: 500,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: location.pathname === item.href ? 'rgba(0, 201, 167, 0.1)' : 'transparent'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {isAuthenticated ? (
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8'}}>
                  <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span style={{fontSize: '0.875rem'}}>
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem'
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem'
                  }}
                >
                  <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem'
                  }}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#00C9A7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem'
                  }}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div style={{display: 'none'}}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{color: '#94A3B8', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer'}}
            >
              {isOpen ? (
                <svg style={{width: '1.5rem', height: '1.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{width: '1.5rem', height: '1.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div style={{display: 'none', background: '#1E293B', borderTop: '1px solid #334155'}}>
            <div style={{padding: '0.5rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{
                    color: location.pathname === item.href ? '#00C9A7' : '#94A3B8',
                    fontWeight: 500,
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: location.pathname === item.href ? 'rgba(0, 201, 167, 0.1)' : 'transparent'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div style={{paddingTop: '1rem', paddingBottom: '0.5rem', borderTop: '1px solid #334155'}}>
                  <div style={{padding: '0.75rem 1rem', color: '#94A3B8'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#94A3B8',
                      border: '1px solid #334155',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '2.5rem',
                      width: '100%',
                      textAlign: 'center',
                      marginBottom: '0.5rem'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#94A3B8',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '2.5rem',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <div style={{paddingTop: '1rem', paddingBottom: '0.5rem', borderTop: '1px solid #334155'}}>
                  <Link
                    to="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#94A3B8',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '2.5rem',
                      width: '100%',
                      textAlign: 'center',
                      marginBottom: '0.5rem'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#00C9A7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '2.5rem',
                      width: '100%',
                      textAlign: 'center'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
