import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
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
      backgroundColor: '#1A4D8F',
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
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.25rem'
            }}
          >
            <div style={{
              fontFamily: "Georgia, serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1
            }}>
              PortfolioForge
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#FFFFFF',
              fontFamily: "Georgia, serif",
              lineHeight: 1
            }}>
              Emmanuel Bagi
            </div>
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
                    color: location.pathname === item.href ? '#FFFFFF' : '#E0E7FF',
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
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: window.innerWidth <= 768 ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <span style={{width:25, height:3, background:'#FFFFFF', display:'block', borderRadius:2}}></span>
              <span style={{width:25, height:3, background:'#FFFFFF', display:'block', borderRadius:2}}></span>
              <span style={{width:25, height:3, background:'#FFFFFF', display:'block', borderRadius:2}}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          display: menuOpen && window.innerWidth <= 768 ? 'flex' : 'none',
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
              onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
