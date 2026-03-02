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
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
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
          <Link 
            to="/" 
            style={{
              fontFamily: "Georgia, serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1A1A2E',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            PortfolioForge
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              display: window.innerWidth > 768 ? 'flex' : 'none',
              alignItems: 'center',
              gap: '2rem'
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{
                    color: location.pathname === item.href ? '#1A4D8F' : '#64748B',
                    fontFamily: "Georgia, serif",
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div style={{
              display: window.innerWidth > 768 ? 'flex' : 'none',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {isAuthenticated ? (
                <>
                  <span style={{
                    color: '#94A3B8',
                    fontSize: '0.875rem'
                  }}>
                    {user.firstName}
                  </span>
                  <Link
                    to="/dashboard"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#1A4D8F',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#94A3B8',
                      border: '1px solid #334155',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#00C9A7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: window.innerWidth <= 768 ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              <span style={{
                width: '25px',
                height: '3px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
              }} />
              <span style={{
                width: '25px',
                height: '3px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                opacity: isOpen ? 0 : 1
              }} />
              <span style={{
                width: '25px',
                height: '3px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
              }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          display: isOpen && window.innerWidth <= 768 ? 'flex' : 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#1A2332',
          borderBottom: '1px solid #334155',
          flexDirection: 'column',
          padding: '1rem',
          gap: '0'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: location.pathname === item.href ? '#00C9A7' : '#94A3B8',
                fontWeight: 500,
                padding: '1rem 0',
                borderBottom: '1px solid #334155',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  padding: '1rem 0',
                  borderBottom: '1px solid #334155',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  padding: '1rem 0',
                  borderBottom: '1px solid #334155',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  padding: '1rem 0',
                  borderBottom: '1px solid #334155',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  padding: '1rem 0',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
