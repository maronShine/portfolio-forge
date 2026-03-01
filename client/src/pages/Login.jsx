import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulation d'authentification réussie
      const userData = {
        id: 1,
        firstName: 'Emmanuel',
        lastName: 'Nduwayo',
        email: formData.email
      }
      
      localStorage.setItem('token', 'mock-jwt-token')
      localStorage.setItem('user', JSON.stringify(userData))
      
      navigate('/dashboard')
    } catch (error) {
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #1A2332 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: '#1E293B',
        borderRadius: '1rem',
        border: '1px solid #334155',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: "Syne, sans-serif",
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: '#00C9A7',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{color: 'white', fontWeight: 'bold', fontFamily: "Syne, sans-serif"}}>PF</span>
            </div>
            <span>PortfolioForge</span>
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontFamily: "Syne, sans-serif"
          }}>
            Connexion
          </h2>
          <p style={{
            color: '#94A3B8',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            Accédez à votre espace portfolio
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* Email */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={isLoading}
              autoComplete="email"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.email ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.email && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="•••••••"
              disabled={isLoading}
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.password ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.password && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember me & Forgot password */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#94A3B8',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#00C9A7'
                }}
              />
              Se souvenir de moi
            </label>
            <a href="#" style={{
              color: '#00C9A7',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Mot de passe oublié?
            </a>
          </div>

          {/* General Error */}
          {errors.general && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #EF4444',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              color: '#EF4444',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00C9A7',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '2.5rem',
              opacity: isLoading ? 0.7 : 1,
              width: '100%'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #334155'
        }}>
          <p style={{
            color: '#94A3B8',
            fontSize: '0.875rem'
          }}>
            Pas encore de compte?{' '}
            <Link 
              to="/register" 
              style={{
                color: '#00C9A7',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Login
